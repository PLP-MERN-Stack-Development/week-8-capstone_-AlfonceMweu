const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson' // Reference to Lesson subdocument in Course
  }],
  progress: { type: Number, default: 0 }, // percentage
  lastAccessed: Date
}, { timestamps: true });

// Compound index to ensure one progress doc per student-course pair
ProgressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);