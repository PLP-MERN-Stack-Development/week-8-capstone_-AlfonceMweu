const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Lesson title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|vimeo\.com|\.mp4|\.mov)/.test(v);
      },
      message: props => `${props.value} is not a valid video URL!`
    }
  },
  duration: {  // in minutes
    type: Number,
    min: [1, 'Duration must be at least 1 minute']
  },
  isFree: {
    type: Boolean,
    default: false
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  attachments: [{
    name: String,
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['pdf', 'doc', 'zip', 'image', 'other'],
      default: 'other'
    }
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
LessonSchema.index({ course: 1, order: 1 }, { unique: true });

// Virtual for completed count (used with progress tracking)
LessonSchema.virtual('completedCount', {
  ref: 'Progress',
  localField: '_id',
  foreignField: 'completedLessons',
  count: true
});

// Middleware to update course when lesson is removed
LessonSchema.pre('remove', async function(next) {
  await this.model('Course').updateOne(
    { _id: this.course },
    { $pull: { lessons: this._id } }
  );
  next();
});

module.exports = mongoose.model('Lesson', LessonSchema);