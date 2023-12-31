const ModulesRepository = require('../repositories/modulesRepository');

const readModulesById = (payload) => {
    return ModulesRepository.readModulesById(payload)
}

const readModules = () => {
    return ModulesRepository.readModules()
}

const createModules = (payload) => {
    return ModulesRepository.createModules(payload)
}

const updatedModules = (payload) => {
    return ModulesRepository.updatedModules(payload)
}

const deletedModules = (payload) => {
    return ModulesRepository.deletedModules(payload)
}

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
    deletedModules
}


