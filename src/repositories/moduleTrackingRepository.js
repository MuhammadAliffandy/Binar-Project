const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModuleTrackingById = (payload) => {

    const { id  } = payload;

    return prisma.ModuleTracking.findUnique({
        where : {
            id : id
        }
    });
}

const readModuleTracking = () => {
    return prisma.ModuleTracking.findMany();
}

const createModuleTracking = (payload) => {

    const { status , userId , moduleId } = payload;

    return prisma.ModuleTracking.create({
        data  : {
            // property
            id : uuidv4(),
            status:status,
            // relation data
            user : {
                connect : {
                    id : userId
                }
            },
            module : {
                connect : {
                    id : moduleId
                }
            }
        }
    }) 
}

const updatedModuleTracking = (payload) => {

    const { id , ...data  } = payload;

    return prisma.ModuleTracking.update({
        where : {
            id : id 
        },
        data  : {
            ...data,
        }
    }) 
}

module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    createModuleTracking,
    updatedModuleTracking,
}
