const ModuleTrackingService = require('../services/moduleTrackingService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const readModuleTrackingById = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.readModuleTrackingById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readModuleTracking = async (req,res) => {
    try {
        const data = await ModuleTrackingService.readModuleTracking();
        return res.status(200).json(new CustomResponse("OK", "View all module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createModuleTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.createModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "create module tracking data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedModuleTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.updatedModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "create module tracking data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}


