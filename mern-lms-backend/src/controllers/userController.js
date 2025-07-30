const User = require('../models/User');
const Course = require('../models/Course');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    // Prevent password updates via this route
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /updatePassword'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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

// Get user's enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'enrolledCourses',
      select: 'title description instructor'
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      results: user.enrolledCourses.length,
      data: {
        courses: user.enrolledCourses
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
  try {
    // 1) Check if course exists
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'No course found with that ID'
      });
    }

    // 2) Check if user is already enrolled
    const user = await User.findById(req.user.id);
    if (user.enrolledCourses.includes(req.params.courseId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'You are already enrolled in this course'
      });
    }

    // 3) Enroll user
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { enrolledCourses: req.params.courseId } }
    );

    // 4) Add user to course's enrolledStudents
    await Course.findByIdAndUpdate(
      req.params.courseId,
      { $addToSet: { enrolledStudents: req.user.id } }
    );

    res.status(200).json({
      status: 'success',
      message: 'Successfully enrolled in course'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};