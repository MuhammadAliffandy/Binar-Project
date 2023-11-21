const express = require('express');
const router = express.Router();

router
.get('/')
.put('/')
.get('/currentUser')
.post('/registration')
.post('/auth')
.post('/logout')

module.exports = router;