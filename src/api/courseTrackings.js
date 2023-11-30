const express = require('express');
const router = express.Router();
const CourseTrackingController = require('../controllers/courseTrackingController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
.get('/' , AuthMiddleware.verifyJWT, CourseTrackingController.readCourseTracking)
.post('/search' ,AuthMiddleware.verifyJWT , CourseTrackingController.checkValidation , CourseTrackingController.readCourseTrackingById)
.post('/' , AuthMiddleware.verifyJWT , CourseTrackingController.createValidation , CourseTrackingController.createCourseTracking)
.put('/', AuthMiddleware.verifyJWT , CourseTrackingController.updateValidation , CourseTrackingController.updatedCourseTracking)

module.exports = router;