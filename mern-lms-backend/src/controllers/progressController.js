const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Track lesson completion
exports.completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // 1) Check if lesson belongs to course
    const lesson = await Lesson.findOne({ 
      _id: lessonId, 
      course: courseId 
    });
    if (!lesson) {
      return res.status(400).json({
        status: 'fail',
        message: 'This lesson does not belong to the specified course'
      });
    }

    // 2) Check if user is enrolled in the course
    const course = await Course.findById(courseId);
    if (!course.enrolledStudents.includes(req.user.id)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not enrolled in this course'
      });
    }

    // 3) Add lesson to completed lessons
    let progress = await Progress.findOne({ 
      student: req.user.id, 
      course: courseId 
    });

    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        course: courseId,
        completedLessons: [lessonId]
      });
    } else {
      // Check if already completed
      if (progress.completedLessons.includes(lessonId)) {
        return res.status(200).json({
          status: 'success',
          message: 'Lesson already marked as completed'
        });
      }

      progress.completedLessons.push(lessonId);
      await progress.save();
    }

    // 4) Calculate new progress percentage
    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const newProgress = Math.round(
      (progress.completedLessons.length / totalLessons) * 100
    );

    progress.progress = newProgress;
    progress.lastAccessed = new Date();
    await progress.save();

    res.status(200).json({
      status: 'success',
      data: {
        progress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get course progress for user
exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId
    }).populate({
      path: 'completedLessons',
      select: 'title order'
    });

    if (!progress) {
      return res.status(200).json({
        status: 'success',
        data: {
          progress: 0,
          completedLessons: []
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        progress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get all progress for user
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.user.id })
      .populate({
        path: 'course',
        select: 'title thumbnail instructor'
      })
      .populate({
        path: 'completedLessons',
        select: 'title order'
      });

    res.status(200).json({
      status: 'success',
      results: progress.length,
      data: {
        progress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};