const Notification = require('../models/notification');
const User = require('../models/User');
const Course = require('../models/Course');

// Get all notifications for user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .populate({
        path: 'relatedCourse',
        select: 'title thumbnail'
      });

    res.status(200).json({
      status: 'success',
      results: notifications.length,
      data: {
        notifications
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: 'fail',
        message: 'No notification found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        notification
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create notification (usually called from other controllers)
exports.createNotification = async (userId, message, type, relatedCourse = null) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message,
      type,
      relatedCourse
    });

    // In a real app, you would emit this via Socket.io
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err);
    return null;
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
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