const ModulesRepository = require('../repositories/modulesRepository');

const readModulesById = (payload) => {
    return ModulesRepository.readModulesById(payload)
}

const readModules = () => {
    return ModulesRepository.readModules()
}

const createModules = (payload , userId) => {
    return ModulesRepository.createModules(payload,userId)
}

const updatedModules = (payload , userId) => {
    return ModulesRepository.updatedModules(payload,userId)
}

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
}


