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
    return prisma.ModuleTracking.findMany({
        include : {
            module : true , 
            user : true,
        }
    });
}

const readModuleTrackingByUser = (payload) => {

    const { userId } = payload

    return prisma.ModuleTracking.findMany({
        where : {
            userId : userId,
        },
        include : {
            module : true,
            user : true 
        }
    });
}
const readModuleTrackingByUserTrack = (payload) => {

    const { userId , moduleId   } = payload

    return prisma.ModuleTracking.findMany({
        where : {
            userId : userId,
            moduleId: moduleId

        }
    });
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
    readModuleTrackingByUser,
    readModuleTrackingByUserTrack,
    createModuleTracking,
    updatedModuleTracking,
}
