const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModulesById = (payload) => {
    return prisma.Module.findUnique({
        where : {
            id : ''
        }
    });
}

const readModules = () => {
    return prisma.Module.findMany();
}

const createModules = (payload , userId) => {
    return prisma.Module.create({
        data  : {
            // property
            id : uuidv4(),
            title : "",
            video: '',
            time: '',
            createdAt: '',
            updatedAt: '',
            // relation data
            courseId: ''
        }
    }) 
}

const updatedModules = (payload , userId) => {
    return prisma.Module.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',

        }
    }) 
}

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
}


