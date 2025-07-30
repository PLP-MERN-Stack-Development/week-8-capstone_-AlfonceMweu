const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['course_update', 'announcement', 'message'],
    required: true 
  },
  isRead: { type: Boolean, default: false },
  relatedCourse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' 
  },
  readAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);