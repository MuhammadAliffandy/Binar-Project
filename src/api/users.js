const express = require('express');
const { changePasswordHandler, updateProfileHandler } = require("../controllers/usersController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .put('/', AuthMiddleware.verifyJWT, updateProfileHandler)
    .put('/change-password', AuthMiddleware.verifyJWT, changePasswordHandler)

module.exports = router;