const express = require('express');
const router = express.Router();
const ModulesController = require('../controllers/modulesController')

router
.get('/', ModulesController.readModules)
.post('/search' , ModulesController.readModulesById)
.post('/' , ModulesController.createValidation, ModulesController.createModules)
.put('/' , ModulesController.updateValidation , ModulesController.updatedModules)

module.exports = router;