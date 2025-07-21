const express = require('express');
const Course = require('../models/Course');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all courses (public)
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

// Create a course (instructor or admin only)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('instructor', 'admin'),
  async (req, res, next) => {
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json(course);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;