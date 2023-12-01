const express = require('express')
const router = express.Router()
const { registerHandler, loginHandler, currentUserHandler, logoutHandler, loginAdminHandler, resetPasswordHandler,
  resetPasswordUserHandler, registerWithOTPHandler, resendOTPHandler
} = require('../controllers/authController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
    .post('/register', registerHandler)
    .post('/register/otp', registerWithOTPHandler)
    .put('/register/resend-otp', resendOTPHandler)
    .post('/login', loginHandler)
    .post('/admin/login', loginAdminHandler)
    .get('/current-user', AuthMiddleware.verifyJWT, currentUserHandler)
    .get('/logout', logoutHandler)
    .put('/reset-password', resetPasswordHandler)
    .put('/reset-password/:resetToken', resetPasswordUserHandler)

module.exports = router