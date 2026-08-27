const mongoose = require('mongoose');

const progressEntrySchema = new mongoose.Schema(
  {
    // Canlı oyun (Live Game) tamamlamaları tek bir konuya bağlı olmadığı için topicId burada null
    // olabilir — bu durumda kayıt hiçbir gerçek konuyla eşleşmez (LessonPage'in "tamamlandı" kontrolü
    // ve badge'lerdeki "konu tamamlama" sayaçları bu yüzden güvenle atlanır).
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: null },
    // Topic ilerideki bir tarihte silinse bile geçmiş kayıtta anlamlı görünmesi için, tamamlanma anındaki
    // başlığın anlık kopyası (snapshot) burada da tutulur.
    topicTitle: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    // Bu ilerleme normal bir ders mi yoksa canlı bir oyun sonucu mu geldi.
    source: { type: String, enum: ['lesson', 'game'], default: 'lesson' },
    // topicId null olduğunda (canlı oyun) Profile sayfasındaki kategori bazlı ortalamaya
    // dahil edilebilmesi için kategori burada ayrıca tutulur.
    category: { type: String, enum: ['grammar', 'vocabulary', 'writing', 'reading'], default: null },
    // Konunun hangi egzersizinin (1, 2, 3...) tamamlandığı — aynı konuya dönüldüğünde
    // daha önce kaydedilmiş egzersiz için "Try Again" gösterebilmek amacıyla tutulur.
    exerciseGroup: { type: Number, default: 1 },
    // Kullanıcının o denemede her soruya verdiği gerçek cevap — "See Answers" ile daha sonra
    // dönüldüğünde doğru cevap yerine kullanıcının kendi cevabını gösterebilmek için tutulur.
    answers: {
      type: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
          answer: mongoose.Schema.Types.Mixed,
        },
      ],
      default: [],
      _id: false,
    },
    // Bu ilerleme bir sınıf ödevi kapsamında tamamlandıysa ilgili Assignment'a işaret eder.
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', default: null },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'], default: null },
    placementTestCompleted: { type: Boolean, default: false },
    progress: { type: [progressEntrySchema], default: [] },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    // Premium/Öğretmen özellikleri (sınıf oluşturma vb.) şimdilik admin tarafından manuel set edilir.
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const { _id, name, email, role, level, placementTestCompleted, progress, badges, isPremium, createdAt } = this;
  return { id: _id, name, email, role, level, placementTestCompleted, progress, badges, isPremium, createdAt };
};

module.exports = mongoose.model('User', userSchema);
