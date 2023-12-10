const express = require('express');
const { createNotificationHandler, getAllUserNotificationHandler, updateNotificationViewedHandler,
  updateAllNotificationViewedHandler
} = require("../controllers/notificationController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post('/', AuthMiddleware.verifyJWT, createNotificationHandler)
    .put('/', AuthMiddleware.verifyJWT, updateNotificationViewedHandler)
    .put('/user', AuthMiddleware.verifyJWT, updateAllNotificationViewedHandler)
    .get('/user', AuthMiddleware.verifyJWT, getAllUserNotificationHandler)

module.exports = router;