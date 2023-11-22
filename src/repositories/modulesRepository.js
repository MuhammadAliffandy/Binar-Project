const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModules = (payload) => {
    return prisma.Module.findUnique({
        where : {
            id : ''
        }
    });
}

const readModulesById = () => {
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


