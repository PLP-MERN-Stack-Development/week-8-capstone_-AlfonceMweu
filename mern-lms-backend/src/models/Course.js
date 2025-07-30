const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String,
  videoUrl: String,
  duration: Number, // in minutes
  isFree: Boolean,
  order: Number,
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  },
  price: Number,
  thumbnail: String,
  isPublished: { type: Boolean, default: false },
  requirements: [String],
  learningOutcomes: [String],
  lessons: [LessonSchema],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
