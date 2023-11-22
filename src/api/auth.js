const express = require('express')
const router = express.Router()
const { registerHandler } = require('../controllers/authController')

router
    .post('/register', registerHandler)
    .post('/login')
    .get('/current-user')

module.exports = router