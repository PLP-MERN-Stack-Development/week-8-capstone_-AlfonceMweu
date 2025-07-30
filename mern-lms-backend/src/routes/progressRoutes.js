const express = require('express');
const progressController = require('../controllers/progressController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Track lesson completion
router.post('/course/:courseId/lesson/:lessonId/complete', progressController.completeLesson);

// Get progress
router.get('/course/:courseId', progressController.getCourseProgress);
router.get('/', progressController.getAllProgress);

module.exports = router;