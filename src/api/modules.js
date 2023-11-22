const express = require('express');
const router = express.Router();
const ModulesController = require('../controllers/modulesController')

router
.get('/', ModulesController.readModules)
.post('/search' , ModulesController.readModulesById)
.post('/' , ModulesController.createModules)
.put('/' , ModulesController.updatedModules)

module.exports = router;