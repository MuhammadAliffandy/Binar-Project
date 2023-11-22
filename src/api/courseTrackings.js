const express = require('express');
const router = express.Router();
const CourseTrackingController = require('../controllers/courseTrackingController')


router
.get('/' , CourseTrackingController.readCourseTracking)
.post('/search')
.post('/')
.put('/')

module.exports = router;