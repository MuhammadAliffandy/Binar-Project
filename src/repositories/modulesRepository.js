const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModulesById = (payload) => {

    const { id } = payload;

    return prisma.Module.findUnique({
        where : {
            id : id,
            deletedAt : null
        }
    });
}

const readModules = () => {
    return prisma.Module.findMany({
        where : {
            deletedAt : null
        },
    });
}

const createModules = (payload) => {

    const { title , video , time , courseId , chapter} = payload;

    return prisma.Module.create({
        data  : {
            // property
            id : uuidv4(),
            title : title,
            video: video,
            time: time,
            chapter : chapter,
            // relation data
            course : {
                connect : {
                    id : courseId
                }
            }
        }
    }) 
}

const updatedModules = (payload ) => {

    const { id , ...data  } = payload;

    return prisma.Module.update({
        where : {
            id : id,
        },
        data  : {
            // property
            ...data,
            updatedAt: new Date(),
        }
    }) 
}


const deletedModules = (payload) => {
    const {id} = payload;

    return prisma.Module.update({
        where: {
            id : id  ,
        },
        data  : {
            deletedAt: new Date(),
        }
    }) 
}


module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
    deletedModules,
}


