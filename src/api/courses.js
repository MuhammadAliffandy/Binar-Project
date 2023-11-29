const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/coursesController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
.get('/',CoursesController.readCourses)
.post('/search', CoursesController.checkValidation ,CoursesController.readCoursesById)
.post('/filter', CoursesController.checkCategoryValidation, CoursesController.readCoursesByCategory)
.post('/',AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin  ,CoursesController.createValidation  , CoursesController.createCourses )
.put('/', AuthMiddleware.verifyJWT , AuthMiddleware.verifyAdmin ,CoursesController.updateValidation , CoursesController.updatedCourses)
.delete('/' ,AuthMiddleware.verifyJWT ,AuthMiddleware.verifyAdmin , CoursesController.checkValidation , CoursesController.deletedCourses )

module.exports = router;