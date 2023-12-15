const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourseTracking = () => {
    return prisma.CourseTracking.findMany({
        include : {
            course : {
                include : {
                    category : true, 
                    module : {
                        include : {
                            moduleTracking : true
                        }
                    }
                }
            },
            user : true,
        }
    });
}

const readCourseTrackingById = (payload) => {

    const { id  } = payload;

    return prisma.CourseTracking.findUnique({
        where : {
            id : id
        }
    });
}

const readCourseTrackingByUser = (payload) => {

    const { userId } = payload
    return prisma.CourseTracking.findMany({
        where : {
            userId : userId,
        },
        include : {
            course : {
                include : {
                    category : true, 
                    module : true
                }
            },
            user : true,
        }
        
    });
}

const readCourseTrackingByUserTrack = (payload) => {

    const { userId ,courseId } = payload
    return prisma.CourseTracking.findMany({
        where : {
            userId : userId,
            courseId: courseId

        }
    });
}

const createCourseTracking = (payload) => {

    const { status , userId , courseId } = payload;

    return prisma.CourseTracking.create({
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
            course : {
                connect : {
                    id : courseId
                }
            }
            
        }
    }) 
}

const updatedCourseTracking = (payload ) => {

    const { id , ...data  } = payload;

    return prisma.CourseTracking.update({
        where : {
            id : id 
        },
        data  : {
            ...data,
        }
    }) 
}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    readCourseTrackingByUser,
    readCourseTrackingByUserTrack,
    createCourseTracking,
    updatedCourseTracking,
}


