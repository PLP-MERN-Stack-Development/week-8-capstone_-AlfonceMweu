const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes
router.use(authController.protect);

router.route('/')
  .get(notificationController.getNotifications);

router.route('/:id/mark-read')
  .patch(notificationController.markAsRead);

router.route('/:id')
  .delete(notificationController.deleteNotification);

module.exports = router;