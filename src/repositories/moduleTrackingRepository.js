const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModuleTrackingById = (payload) => {
    return prisma.ModuleTracking.findUnique({
        where : {
            id : ''
        }
    });
}

const readModuleTracking = () => {
    return prisma.ModuleTracking.findMany();
}

const createModuleTracking = (payload , userId) => {
    return prisma.ModuleTracking.create({
        data  : {
            // property
            id : uuidv4(),
            status: '',
            // relation data
            userId: '',
            courseId: ''
        }
    }) 
}

const updatedModuleTracking = (payload , userId) => {
    return prisma.ModuleTracking.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',

        }
    }) 
}


module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}
