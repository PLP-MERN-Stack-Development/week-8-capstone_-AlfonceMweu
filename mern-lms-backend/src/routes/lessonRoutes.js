const express = require('express');
const lessonController = require('../controllers/lessonController');
const authController = require('../controllers/authController');
const router = express.Router();

// Public routes
router.route('/course/:courseId')
  .get(lessonController.getCourseLessons);

router.route('/:id')
  .get(lessonController.getLesson);

// Protected routes (require authentication)
router.use(authController.protect);

// Instructor+ routes
router.use(authController.restrictTo('instructor', 'admin'));

router.route('/')
  .post(lessonController.createLesson);

router.route('/:id')
  .patch(lessonController.updateLesson)
  .delete(lessonController.deleteLesson);

// Reorder lessons
router.patch('/course/:courseId/reorder', lessonController.reorderLessons);

module.exports = router;