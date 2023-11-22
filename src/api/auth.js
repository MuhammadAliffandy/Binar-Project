const express = require('express')
const router = express.Router()
const { registerHandler, loginHandler } = require('../controllers/authController')

router
    .post('/register', registerHandler)
    .post('/login', loginHandler)
    .get('/current-user')

module.exports = router