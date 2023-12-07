const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourses = () => {
    return prisma.Course.findMany({
        where : {
            deletedAt : null
        },
        include : {
            category : true, 
            module : true
        }
    });
}

const readCoursesById = (payload) => {
    const { id } = payload ;

    return prisma.Course.findUnique({
        where : {
            id : id
        }
    });
}

const readCoursesByCategory = (payload) => {
    const { categoryId } = payload ;
    return prisma.Course.findMany({
        where : {
            categoryId : categoryId
        },
    });
}

const createCourses = (payload , userId) => {

    const user = userId.id;

    const {
        title,
        image,
        subtitle,
        description,
        classCode,
        type,
        authorBy,
        rating,
        price,
        level,
        categoryId,
    } = payload 
    
    return prisma.Course.create({
        data  : {
            // property
            id : uuidv4(),
            title : title,
            image : image,
            subtitle: subtitle,
            description : description,
            classCode: classCode,
            type : type,
            authorBy: authorBy,
            rating:rating,
            price: price,
            level: level,
            creator : {
                connect : {
                    id : user
                }
            },
            updater : {
                connect : {
                    id : user
                }
            },
            category : {
                connect : {
                    id : categoryId
                }
            },

        }
    }) 
}

const updatedCourses = (payload , userId) => {

    const { id , ...data } = payload
    const user = userId.id;

    return prisma.Course.update({
        where : {
            id : id
        },
        data  : {
            ...data,
            updatedAt: new Date(),
            // relation data
            updater : {
                connect : {
                    id : user
                }
            },
        }

    }) 
}

const deletedCourses = (payload , userId) => {

    const user = userId.id;
    const {id} = payload;

    return prisma.Course.update({
        where: {
            id : id  ,
        },
        data  : {
            deletedAt: new Date(),
            deleter : {
                connect : {
                    id : user
                }
            },
        }
    }) 
}

module.exports = {
    readCourses,
    readCoursesById,
    readCoursesByCategory,
    createCourses,
    updatedCourses,
    deletedCourses,
    
}


