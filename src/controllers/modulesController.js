const ModulesService = require('../services/modulesService')

const readModulesById = async () => {
    try {
        const payload = req.body;
        const data = await ModulesService.readModulesById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const readModules = async () => {
    try {
        const data = await ModulesService.readModules();
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const createModules = async () => {
    try {
        const payload = req.body;
        const data = await ModulesService.createModules(payload);
        return res.status(201).json(new CustomResponse("OK", "create module data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const updatedModules = async () => {
    try {
        const payload = req.body;
        const data = await ModulesService.updatedModules(payload);
        return res.status(201).json(new CustomResponse("OK", "update module data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
}


