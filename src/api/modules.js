const express = require('express');
const router = express.Router();
const ModulesController = require('../controllers/modulesController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router
.get('/', AuthMiddleware.verifyJWT , ModulesController.readModules)
.post('/search' , AuthMiddleware.verifyJWT , ModulesController.checkValidation , ModulesController.readModulesById)
.post('/' , AuthMiddleware.verifyJWT , AuthMiddleware.verifyAdmin , ModulesController.createValidation, ModulesController.createModules)
.put('/' , AuthMiddleware.verifyJWT , AuthMiddleware.verifyAdmin , ModulesController.updateValidation , ModulesController.updatedModules)
.delete('/' , AuthMiddleware.verifyJWT , AuthMiddleware.verifyAdmin , ModulesController.checkValidation , ModulesController.deletedModules)

module.exports = router;