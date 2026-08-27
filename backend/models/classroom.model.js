const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // 6 haneli, benzersiz katılım kodu (örn: A7F2K9) — controller içinde üretilir.
    joinCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

classroomSchema.index({ teacherId: 1 });

module.exports = mongoose.model('Classroom', classroomSchema);
