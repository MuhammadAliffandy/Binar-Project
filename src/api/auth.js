const express = require('express')
const router = express.Router()
const { registerHandler, loginHandler, currentUserHandler, logoutHandler, loginAdminHandler } = require('../controllers/authController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
    .post('/register', registerHandler)
    .post('/login', loginHandler)
    .post('/admin/login', loginAdminHandler)
    .get('/current-user', AuthMiddleware.verifyJWT, currentUserHandler)
    .get('/logout', logoutHandler)

module.exports = router