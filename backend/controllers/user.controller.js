const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { User, Topic, Classroom, Assignment, GameResult } = require('../models');
const { dayKey, currentStreak, evaluateBadges } = require('../utils/badgeEngine');
const { appendProgressEntry } = require('../utils/progress.util');
const { getRequiredTopicCount } = require('../utils/levelProgress.util');
const { fullyCompletedTopicIds } = require('../utils/topicCompletion.util');

const me = asyncHandler(async (req, res) => {
  // Profil açılınca rozetler yeniden kontrol edilir: yeni eklenen rozetlerin şartını zaten sağlayanlar da kazanır.
  const plainUser = await User.findById(req.user.id);
  if (!plainUser) throw new ApiError(404, 'Kullanıcı bulunamadı.');
  // Otomatik maillerin dili: kullanıcının son kullandığı arayüz dili.
  if (plainUser.language !== req.lang) {
    plainUser.language = req.lang;
    await plainUser.save();
  }
  await evaluateBadges(plainUser);

  const user = await User.findById(req.user.id).populate('badges').populate('progress.topicId');

  const streak = currentStreak(user.progress.map((p) => dayKey(p.completedAt)));

  // Tüm alıştırmaları bitirilmiş konular: istemciler "tamamlandı" işaretini buna göre koyar.
  const completedSet = await fullyCompletedTopicIds(user.progress);
  const completedTopicIds = [...completedSet];

  let levelProgress = null;
  if (user.level) {
    const requiredCount = await getRequiredTopicCount(user.level);
    const completedAtLevel = new Set(
      user.progress
        .filter((p) => p.topicId?.level === user.level && completedSet.has(p.topicId._id.toString()))
        .map((p) => p.topicId._id.toString())
    ).size;
    levelProgress = {
      completed: completedAtLevel,
      total: requiredCount,
      percent: requiredCount ? Math.round((completedAtLevel / requiredCount) * 100) : 0,
    };
  }

  res.json({ success: true, data: { user: { ...user.toSafeJSON(), completedTopicIds }, streak, levelProgress } });
});

const addProgress = asyncHandler(async (req, res) => {
  const { topicId, score, assignmentId, exerciseGroup, answers } = req.body;

  const topic = await Topic.findById(topicId);
  if (!topic) throw new ApiError(404, 'Konu bulunamadı.');

  const { user, newlyAwardedBadges, leveledUpTo } = await appendProgressEntry(req.user.id, {
    topicId,
    topicTitle: topic.title,
    score,
    exerciseGroup: exerciseGroup || 1,
    answers: Array.isArray(answers) ? answers : [],
    assignmentId: assignmentId || null,
    source: 'lesson',
    category: topic.category,
  });

  res.json({
    success: true,
    message: 'İlerleme kaydedildi.',
    data: { user: user.toSafeJSON(), newlyAwardedBadges, leveledUpTo },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
  if (existing) throw new ApiError(409, 'Bu e-posta adresi zaten kayıtlı.');

  const user = await User.findById(req.user.id);
  user.name = name;
  user.email = email;
  await user.save();

  res.json({ success: true, message: 'Profil güncellendi.', data: { user: user.toSafeJSON() } });
});

// E-posta tercihleri (şimdilik sadece seri hatırlatma maili).
const updatePreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, 'Kullanıcı bulunamadı.');
  user.emailReminders = req.body.emailReminders;
  await user.save();
  res.json({ success: true, message: 'Tercihlerin kaydedildi.', data: { user: user.toSafeJSON() } });
});

// İlk girişteki seviye seçimi ("Yeni başlıyorum" → A1, "Seviyemi biliyorum" → seçilen seviye).
// Sadece seviyesi henüz belirlenmemiş kullanıcılar için; sonrasında seviye testle veya ilerledikçe değişir.
const setLevel = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.level) throw new ApiError(409, 'Seviyen zaten belirlenmiş.');

  user.level = req.body.level;
  await user.save();

  res.json({ success: true, message: 'Seviye kaydedildi.', data: { user: user.toSafeJSON() } });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');
  // Google ile açılmış (şifresiz) hesaplar mevcut şifre olmadan ilk şifrelerini belirleyebilir.
  if (user.password) {
    if (!currentPassword) throw new ApiError(400, 'Mevcut şifre zorunludur.');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new ApiError(401, 'Mevcut şifre hatalı.');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.hasPassword = true;
  await user.save();

  res.json({ success: true, message: 'Şifre güncellendi.' });
});

const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user.id).select('+password');
  // Şifresiz (Google ile açılmış) hesaplarda şifre sorulmaz; onay frontend'de "DELETE" yazılarak alınır.
  if (user.password) {
    if (!password) throw new ApiError(400, 'Şifre zorunludur.');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, 'Şifre hatalı.');
  }

  // Kullanıcı öğretmen olarak sınıf sahibiyse, o sınıfları devralacak başka bir öğretmen
  // veya "sınıfı sil" özelliği henüz yok — bu yüzden hesap silinirken sahip olunan sınıflar
  // (ve onlara bağlı ödevler) da birlikte kaldırılır. Öğrenci olarak katılınan sınıflardan ise
  // sadece üyelik kaydı çıkarılır, sınıfın kendisi etkilenmez.
  const ownedClassrooms = await Classroom.find({ teacherId: user._id }).select('_id');
  const ownedClassroomIds = ownedClassrooms.map((c) => c._id);
  if (ownedClassroomIds.length) {
    await Assignment.deleteMany({ classroomId: { $in: ownedClassroomIds } });
    await Classroom.deleteMany({ _id: { $in: ownedClassroomIds } });
  }
  await Classroom.updateMany({ students: user._id }, { $pull: { students: user._id } });

  await GameResult.deleteMany({ userId: user._id });
  await User.deleteOne({ _id: user._id });

  res.json({ success: true, message: 'Hesap silindi.' });
});

module.exports = { me, addProgress, updateProfile, updatePreferences, setLevel, changePassword, deleteAccount };
