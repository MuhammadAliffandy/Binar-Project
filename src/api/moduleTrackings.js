const express = require('express');
const router = express.Router();
const ModuleTrackingController = require('../controllers/moduleTrackingController')

router
.get('/' , ModuleTrackingController.readModuleTracking)
.post('/search', ModuleTrackingController.readModuleTrackingById)
.post('/', ModuleTrackingController.createModuleTracking)
.put('/', ModuleTrackingController.updatedModuleTracking)

module.exports = router;