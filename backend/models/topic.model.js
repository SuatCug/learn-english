const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['grammar', 'vocabulary', 'writing', 'reading'], required: true },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'], required: true },
    description: { type: String, trim: true, default: '' },
    passage: { type: String, default: null },
  },
  { timestamps: true }
);

topicSchema.index({ category: 1, level: 1 });

module.exports = mongoose.model('Topic', topicSchema);
