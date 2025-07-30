const Course = require('../models/Course');
const User = require('../models/User');
const APIFeatures = require('../utils/apiFeatures');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Course.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const courses = await features.query.populate({
      path: 'instructor',
      select: 'username profile'
    });

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get single course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'instructor',
        select: 'username profile'
      })
      .populate('enrolledStudents', 'username profile');

    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create course (instructor only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      instructor: req.user.id,
      category,
      price
    });

    res.status(201).json({
      status: 'success',
      data: {
        course: newCourse
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update course (instructor only)
exports.updateCourse = async (req, res) => {
  try {
    // 1) Check if course exists and user is the instructor
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to update this course'
      });
    }

    // 2) Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        course: updatedCourse
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete course (instructor or admin)
exports.deleteCourse = async (req, res) => {
  try {
    // 1) Check if course exists and user is the instructor or admin
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to delete this course'
      });
    }

    // 2) Delete course
    await Course.findByIdAndDelete(req.params.id);

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

// Publish course (instructor only)
exports.publishCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};