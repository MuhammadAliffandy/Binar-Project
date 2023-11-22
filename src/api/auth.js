const express = require('express')
const router = express.Router()

router
    .post('/register')
    .post('/login')
    .get('/current-user')

module.exports = router