const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { Classroom, Assignment, Topic, User, Question } = require('../models');
const { generateJoinCode } = require('../utils/joinCode');

const createUniqueJoinCode = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = generateJoinCode();
    // eslint-disable-next-line no-await-in-loop
    const exists = await Classroom.findOne({ joinCode: code });
    if (!exists) return code;
  }
  throw new ApiError(500, 'Benzersiz bir katılım kodu üretilemedi, lütfen tekrar deneyin.');
};

const createClassroom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const joinCode = await createUniqueJoinCode();

  const classroom = await Classroom.create({ name, teacherId: req.user.id, joinCode, students: [] });

  res.status(201).json({ success: true, message: 'Sınıf oluşturuldu.', data: { classroom } });
});

const joinClassroom = asyncHandler(async (req, res) => {
  const { joinCode } = req.body;

  const classroom = await Classroom.findOne({ joinCode: joinCode.toUpperCase() });
  if (!classroom) throw new ApiError(404, 'Bu koda sahip bir sınıf bulunamadı.');

  if (classroom.teacherId.toString() === req.user.id) {
    throw new ApiError(400, 'Kendi sınıfınıza öğrenci olarak katılamazsınız.');
  }

  const alreadyJoined = classroom.students.some((studentId) => studentId.toString() === req.user.id);
  if (!alreadyJoined) {
    classroom.students.push(req.user.id);
    await classroom.save();
  }

  res.json({ success: true, message: 'Sınıfa katıldınız.', data: { classroom } });
});

// "Odalarım": kullanıcının öğretmen olduğu VEYA öğrenci olarak kayıtlı olduğu tüm sınıflar.
const getMyClassrooms = asyncHandler(async (req, res) => {
  const classrooms = await Classroom.find({
    $or: [{ teacherId: req.user.id }, { students: req.user.id }],
  })
    .populate('teacherId', 'name email')
    .sort({ createdAt: -1 });

  const data = classrooms.map((c) => ({
    ...c.toObject(),
    role: c.teacherId._id.toString() === req.user.id ? 'teacher' : 'student',
    studentCount: c.students.length,
  }));

  res.json({ success: true, data: { classrooms: data } });
});

const canViewClassroom = (classroom, userId) =>
  classroom.teacherId._id?.toString() === userId ||
  classroom.teacherId.toString() === userId ||
  classroom.students.some((s) => (s._id ? s._id.toString() : s.toString()) === userId);

const getClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id).populate('teacherId', 'name email');
  if (!classroom) throw new ApiError(404, 'Sınıf bulunamadı.');

  if (!canViewClassroom(classroom, req.user.id)) {
    throw new ApiError(403, 'Bu sınıfı görüntüleme yetkiniz yok.');
  }

  const assignments = await Assignment.find({ classroomId: classroom._id })
    .populate('topicId', 'title category level')
    .sort({ assignedAt: -1 });

  // Puanlar: hem bu sınıfa özel ödevleri tamamlamaktan hem de genel egzersiz çözmekten
  // (herhangi bir topic'i tamamlamaktan) kazanılır — o yüzden öğrencinin TÜM progress
  // kayıtlarının toplamı kullanılır, sadece ödeve bağlı olanlar değil.
  const studentDocs = await User.find({ _id: { $in: classroom.students } }).select('name email level progress');
  const todayKey = new Date().toISOString().slice(0, 10);

  // "Topics Completed Today" bir konunun TEK bir egzersizini değil, o konunun TÜM
  // egzersizlerini gerektirir — bunun için her konunun kaç egzersizi olduğunu (Question
  // koleksiyonundaki farklı exerciseGroup sayısı) önceden çıkarıyoruz.
  const referencedTopicIds = [
    ...new Set(studentDocs.flatMap((s) => s.progress.filter((p) => p.topicId).map((p) => p.topicId.toString()))),
  ];
  const exerciseCountEntries = await Promise.all(
    referencedTopicIds.map(async (topicId) => [topicId, (await Question.distinct('exerciseGroup', { topicId })).length || 1])
  );
  const totalExercisesByTopic = new Map(exerciseCountEntries);

  const students = studentDocs.map((s) => {
    const points = s.progress.reduce((sum, p) => sum + p.score, 0);
    // "Active this week" göstergesi için — öğrencinin en son ne zaman bir egzersiz
    // tamamladığı (gerçek zamanlı çevrimiçi durumu değil, tek bildiğimiz bu).
    const lastActiveAt = s.progress.length
      ? new Date(Math.max(...s.progress.map((p) => new Date(p.completedAt).getTime())))
      : null;

    // Her konu için tamamlanan egzersiz grupları ve en son tamamlanma zamanı.
    const byTopic = new Map();
    s.progress
      .filter((p) => p.topicId)
      .forEach((p) => {
        const key = p.topicId.toString();
        const entry = byTopic.get(key) ?? { groups: new Set(), lastAt: null };
        entry.groups.add(p.exerciseGroup ?? 1);
        const at = new Date(p.completedAt);
        if (!entry.lastAt || at > entry.lastAt) entry.lastAt = at;
        byTopic.set(key, entry);
      });

    // "Completed Topic Today": konunun TÜM egzersizleri bitmiş VE bu tamama noktasına
    // (o konudaki en son tamamlanan egzersize) bugün ulaşılmış olmalı.
    const completedTopicToday = [...byTopic.entries()].some(([topicId, entry]) => {
      const totalExercises = totalExercisesByTopic.get(topicId) ?? 1;
      const isFullyCompleted = entry.groups.size >= totalExercises;
      const isToday = entry.lastAt && entry.lastAt.toISOString().slice(0, 10) === todayKey;
      return isFullyCompleted && isToday;
    });

    // "Avg. Score": belirli bir ödeve bağlı değil, öğrencinin TÜM egzersiz geçmişinden
    // hesaplanır — böylece sınıfta hiç ödev atanmamış olsa bile (serbest çalışma) anlamlı kalır.
    const avgScore = s.progress.length
      ? Math.round(s.progress.reduce((sum, p) => sum + p.score, 0) / s.progress.length)
      : null;
    return { _id: s._id, name: s.name, email: s.email, level: s.level, points, lastActiveAt, completedTopicToday, avgScore };
  });

  res.json({ success: true, data: { classroom: { ...classroom.toObject(), students }, assignments } });
});

const createAssignment = asyncHandler(async (req, res) => {
  const { topicId, dueDate } = req.body;

  const topic = await Topic.findById(topicId);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  const assignment = await Assignment.create({
    classroomId: req.classroom._id,
    topicId,
    dueDate,
    assignedAt: new Date(),
  });

  res.status(201).json({ success: true, message: 'Ödev atandı.', data: { assignment } });
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findOneAndDelete({
    _id: req.params.assignmentId,
    classroomId: req.classroom._id,
  });
  if (!assignment) throw new ApiError(404, 'Ödev bulunamadı.');

  res.json({ success: true, message: 'Ödev silindi.' });
});

const getResults = asyncHandler(async (req, res) => {
  const classroom = req.classroom;

  const [assignments, students] = await Promise.all([
    Assignment.find({ classroomId: classroom._id }).populate('topicId', 'title category level').sort({ assignedAt: 1 }),
    User.find({ _id: { $in: classroom.students } }).select('name email progress'),
  ]);

  // Ayrı bir sonuç şeması yok: her (öğrenci, ödev) çifti için user.progress içinden
  // assignmentId eşleşmesi aranıyor.
  const results = students.map((student) => {
    const scores = {};
    assignments.forEach((assignment) => {
      const entry = student.progress.find(
        (p) => p.assignmentId && p.assignmentId.toString() === assignment._id.toString()
      );
      scores[assignment._id.toString()] = entry
        ? { completed: true, score: entry.score, completedAt: entry.completedAt }
        : { completed: false, score: null, completedAt: null };
    });
    return { studentId: student._id, name: student.name, email: student.email, scores };
  });

  res.json({
    success: true,
    data: {
      assignments: assignments.map((a) => ({
        id: a._id,
        topicId: a.topicId?._id,
        topicTitle: a.topicId?.title,
        dueDate: a.dueDate,
      })),
      results,
    },
  });
});

module.exports = {
  createClassroom,
  joinClassroom,
  getClassroom,
  createAssignment,
  deleteAssignment,
  getResults,
  getMyClassrooms,
};
