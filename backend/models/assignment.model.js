const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  dueDate: { type: Date, required: true },
  assignedAt: { type: Date, default: Date.now },
});

assignmentSchema.index({ classroomId: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
