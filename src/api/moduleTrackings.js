const express = require('express');
const router = express.Router();
const ModuleTrackingController = require('../controllers/moduleTrackingController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
.get('/' , AuthMiddleware.verifyJWT , ModuleTrackingController.readModuleTracking)
.get('/user', AuthMiddleware.verifyJWT, ModuleTrackingController.readModuleTrackingByUser)
.post('/search', AuthMiddleware.verifyJWT , ModuleTrackingController.checkValidation , ModuleTrackingController.readModuleTrackingById)
.post('/userTrack', AuthMiddleware.verifyJWT, ModuleTrackingController.readModuleTrackingByUserTrack)
.post('/', AuthMiddleware.verifyJWT , ModuleTrackingController.createValidation, ModuleTrackingController.createModuleTracking)
.put('/', AuthMiddleware.verifyJWT , ModuleTrackingController.updateValidation ,  ModuleTrackingController.updatedModuleTracking)

module.exports = router;