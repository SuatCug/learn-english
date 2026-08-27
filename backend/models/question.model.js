const mongoose = require('mongoose');

const matchingPairSchema = new mongoose.Schema(
  { left: { type: String, required: true }, right: { type: String, required: true } },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: null },
    type: { type: String, enum: ['multiple-choice', 'fill-in-blanks', 'matching'], required: true },
    title: { type: String, required: true, trim: true },
    options: { type: [String], default: undefined },
    correctAnswer: { type: mongoose.Schema.Types.Mixed, default: undefined },
    matchingPairs: { type: [matchingPairSchema], default: undefined },
    explanation: { type: String, default: '' },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'], required: true },
    isPlacementQuestion: { type: Boolean, default: false },
    exerciseGroup: { type: Number, default: 1, min: 1 },
    // Placement test alanları: section soruyu Reading/Grammar/Vocabulary'ye ayırır,
    // passage aynı gruptaki sorularda tekrar eden okuma metni/boşluklu paragraftır,
    // order sabit (rastgele olmayan) sınav sırasını belirler.
    section: { type: String, enum: ['reading', 'grammar', 'vocabulary', 'writing'], default: null },
    passage: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

questionSchema.index({ topicId: 1 });
questionSchema.index({ isPlacementQuestion: 1, level: 1 });

module.exports = mongoose.model('Question', questionSchema);
