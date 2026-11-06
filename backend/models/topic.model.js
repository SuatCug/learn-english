const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['grammar', 'vocabulary', 'writing', 'reading', 'listening'], required: true },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], required: true },
    description: { type: String, trim: true, default: '' },
    passage: { type: String, default: null },
    // Kart resminin Cloudinary public ID'si (ör. topics/grammar/a1/01-subject-pronouns); yoksa null.
    image: { type: String, default: null },
    // Listening konularının ses kaydının Cloudinary public ID'si (resource_type: video); yoksa null.
    // Bu konularda `passage` transkripti tutar.
    audio: { type: String, default: null },
  },
  { timestamps: true }
);

topicSchema.index({ category: 1, level: 1 });

module.exports = mongoose.model('Topic', topicSchema);
