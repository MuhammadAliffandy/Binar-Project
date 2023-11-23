const express = require('express');
const router = express.Router();
const CourseTrackingController = require('../controllers/courseTrackingController')


router
.get('/' , CourseTrackingController.readCourseTracking)
.post('/search' , CourseTrackingController.readCourseTrackingById)
.post('/' , CourseTrackingController.createValidation , CourseTrackingController.createCourseTracking)
.put('/', CourseTrackingController.updateValidation , CourseTrackingController.updatedCourseTracking)

module.exports = router;