const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readModules = (payload) => {
    return prisma.CourseTracking.findUnique({
        where : {
            id : ''
        }
    });
}

const readModulesById = () => {
    return prisma.CourseTracking.findMany();
}

const createModules = (payload , userId) => {
    return prisma.CourseTracking.create({
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

const updatedModules = (payload , userId) => {
    return prisma.CourseTracking.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',

        }
    }) 
}


