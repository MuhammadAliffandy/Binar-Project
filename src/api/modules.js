const express = require('express');
const router = express.Router();
const ModulesController = require('../controllers/modulesController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
.get('/', AuthMiddleware.verifyJWT , ModulesController.readModules)
.post('/search' , AuthMiddleware.verifyJWT , ModulesController.checkValidation , ModulesController.readModulesById)
.post('/' , AuthMiddleware.verifyJWT , ModulesController.createValidation, ModulesController.createModules)
.put('/' , AuthMiddleware.verifyJWT , ModulesController.updateValidation , ModulesController.updatedModules)

module.exports = router;