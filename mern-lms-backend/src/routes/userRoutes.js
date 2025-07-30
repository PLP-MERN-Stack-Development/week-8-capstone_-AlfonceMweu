const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Get current user profile
router.get('/me', userController.getMe, userController.getUser);

// Update user profile
router.patch('/updateMe', userController.updateMe);
router.put('/updateMe', userController.updateMe);

// Delete user account
router.delete('/deleteMe', userController.deleteMe);

// Enroll in course
router.post('/enroll/:courseId', userController.enrollInCourse);

// Get enrolled courses
router.get('/enrolled-courses', userController.getEnrolledCourses);

// ADMIN ONLY ROUTES
router.use(authController.restrictTo('admin'));

router.route('/')
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;