const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourseTracking = () => {
    return prisma.CourseTracking.findMany();
}

const readCourseTrackingById = (payload) => {
    return prisma.CourseTracking.findUnique({
        where : {
            id : ''
        }
    });
}

const createCourseTracking = (payload , userId) => {
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

const updatedCourseTracking = (payload , userId) => {
    return prisma.CourseTracking.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',

        }
    }) 
}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    createCourseTracking,
    updatedCourseTracking,
}


