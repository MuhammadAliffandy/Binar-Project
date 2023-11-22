const ModuleTrackingRepository = require('../repositories/moduleTrackingRepository')

const readModuleTrackingById = (payload) => {
    return ModuleTrackingRepository.readModuleTrackingId(payload);
}

const readModuleTracking = () => {
    return ModuleTrackingRepository.readModuleTracking();
}

const createModuleTracking = (payload , userId) => {
    return ModuleTrackingRepository.createModuleTracking(payload,userId)
}

const updatedModuleTracking = (payload , userId) => {
    return ModuleTrackingRepository.updatedModuleTracking(payload,userId)
}


module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}
