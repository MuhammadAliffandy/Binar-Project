const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModulesById = (payload) => {

    const { id } = payload;

    return prisma.Module.findUnique({
        where : {
            id : id
        }
    });
}

const readModules = () => {
    return prisma.Module.findMany();
}

const createModules = (payload) => {

    const { title , video , time , courseId } = payload;

    return prisma.Module.create({
        data  : {
            // property
            id : uuidv4(),
            title : title,
            video: video,
            time: time,
            createdAt: new Date(),
            updatedAt: new Date(),
            // relation data
            courseId: courseId
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

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
}


