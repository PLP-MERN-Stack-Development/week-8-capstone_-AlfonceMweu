const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// Get all lessons for a course
exports.getCourseLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId })
      .sort('order')
      .select('-__v');

    res.status(200).json({
      status: 'success',
      results: lessons.length,
      data: {
        lessons
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get single lesson
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        status: 'fail',
        message: 'No lesson found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        lesson
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create lesson (instructor only)
exports.createLesson = async (req, res) => {
  try {
    // 1) Check if course exists and user is the instructor
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to add lessons to this course'
      });
    }

    // 2) Get the next order number
    const lastLesson = await Lesson.findOne({ course: req.body.course })
      .sort('-order');
    const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

    // 3) Create lesson
    const newLesson = await Lesson.create({
      ...req.body,
      order: nextOrder
    });

    // 4) Add lesson to course
    await Course.findByIdAndUpdate(
      req.body.course,
      { $push: { lessons: newLesson._id } }
    );

    res.status(201).json({
      status: 'success',
      data: {
        lesson: newLesson
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update lesson (instructor only)
exports.updateLesson = async (req, res) => {
  try {
    // 1) Get lesson and check if course exists
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        status: 'fail',
        message: 'No lesson found with that ID'
      });
    }

    const course = await Course.findById(lesson.course);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found for this lesson'
      });
    }

    // 2) Check if user is the instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to update this lesson'
      });
    }

    // 3) Update lesson (don't allow changing course ID)
    const { course: _, ...updateData } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        lesson: updatedLesson
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete lesson (instructor only)
exports.deleteLesson = async (req, res) => {
  try {
    // 1) Get lesson and check if course exists
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        status: 'fail',
        message: 'No lesson found with that ID'
      });
    }

    const course = await Course.findById(lesson.course);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found for this lesson'
      });
    }

    // 2) Check if user is the instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to delete this lesson'
      });
    }

    // 3) Delete lesson (pre middleware will handle removing from course)
    await lesson.remove();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Reorder lessons
exports.reorderLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { newOrder } = req.body; // Array of lesson IDs in new order

    // 1) Verify all lessons belong to the course
    const lessons = await Lesson.find({ course: courseId });
    const lessonIds = lessons.map(lesson => lesson._id.toString());

    const allValid = newOrder.every(id => lessonIds.includes(id));
    if (!allValid || newOrder.length !== lessonIds.length) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid lesson order provided'
      });
    }

    // 2) Update order for each lesson
    const bulkOps = newOrder.map((lessonId, index) => ({
      updateOne: {
        filter: { _id: lessonId },
        update: { $set: { order: index + 1 } }
      }
    }));

    await Lesson.bulkWrite(bulkOps);

    res.status(200).json({
      status: 'success',
      message: 'Lessons reordered successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
