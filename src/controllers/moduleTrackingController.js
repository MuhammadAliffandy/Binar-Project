const ModuleTrackingService = require('../services/moduleTrackingService')

const readModuleTrackingById = async () => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.readModuleTrackingById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all module tracking data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const readModuleTracking = async () => {
    try {
        const data = await ModuleTrackingService.readModuleTracking();
        return res.status(200).json(new CustomResponse("OK", "View all module tracking data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const createModuleTracking = async () => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.createModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "create module tracking data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const updatedModuleTracking = async () => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.updatedModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "create module tracking data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}


