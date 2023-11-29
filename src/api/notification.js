const express = require('express');
const { createNotificationHandler, getAllUserNotificationHandler } = require("../controllers/notificationController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post('/', AuthMiddleware.verifyJWT, createNotificationHandler)
    .get('/user', AuthMiddleware.verifyJWT, getAllUserNotificationHandler)

module.exports = router;