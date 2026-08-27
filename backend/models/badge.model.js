const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: '🏅' },
    criteriaType: {
      type: String,
      enum: ['topics_completed', 'level_completed', 'perfect_score', 'streak'],
      required: true,
    },
    criteriaValue: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', badgeSchema);
