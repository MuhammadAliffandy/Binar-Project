const express = require('express')
const router = express.Router()
const { registerHandler, loginHandler, currentUserHandler } = require('../controllers/authController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
    .post('/register', registerHandler)
    .post('/login', loginHandler)
    .get('/current-user', AuthMiddleware.verifyJWT, currentUserHandler)

module.exports = router