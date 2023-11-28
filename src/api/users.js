const express = require('express');
const { changePasswordHandler, updateProfileHandler, getTotalUsersHandler } = require("../controllers/usersController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .get('/', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, getTotalUsersHandler)
    .put('/', AuthMiddleware.verifyJWT, updateProfileHandler)
    .put('/change-password', AuthMiddleware.verifyJWT, changePasswordHandler)

module.exports = router;