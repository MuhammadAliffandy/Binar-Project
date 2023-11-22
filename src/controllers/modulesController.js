const ModulesService = require('../services/modulesService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const readModulesById = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.readModulesById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readModules = async (req,res) => {
    try {
        const data = await ModulesService.readModules();
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createModules = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.createModules(payload);
        return res.status(201).json(new CustomResponse("OK", "create module data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedModules = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.updatedModules(payload);
        return res.status(201).json(new CustomResponse("OK", "update module data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
}


