const ModuleTrackingRepository = require('../repositories/moduleTrackingRepository')

const readModuleTrackingById = (payload) => {
    return ModuleTrackingRepository.readModuleTrackingById(payload);
}

const readModuleTracking = () => {
    return ModuleTrackingRepository.readModuleTracking();
}

const createModuleTracking = (payload) => {
    return ModuleTrackingRepository.createModuleTracking(payload)
}

const updatedModuleTracking = (payload) => {
    return ModuleTrackingRepository.updatedModuleTracking(payload)
}


module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}
