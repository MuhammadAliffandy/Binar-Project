const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/coursesController')

router
.get('/',CoursesController.readCourses)
.post('/search',CoursesController.readCoursesById)
.post('/filter',CoursesController.readCoursesById)
.post('/', CoursesController.createCourses )
.put('/',CoursesController.updatedCourses)
.delete('/' , CoursesController.deletedCourses )

module.exports = router;