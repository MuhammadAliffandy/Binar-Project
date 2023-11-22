const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourses = () => {
    return prisma.Course.findMany();
}

const readCoursesById = (payload) => {

    const { id } = payload ;

    return prisma.Course.findUnique({
        where : {
            id : id
        }
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
            createdAt: new Date(),
            updatedAt:new Date(),
            deletedAt: null,
            // relation data
            createdBy: user,
            updatedBy: user,
            deletedBy: null,
            categoryId: categoryId,
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
            updatedBy: user
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
            deletedBy: user,
        }
    }) 
}

module.exports = {
    readCourses,
    readCoursesById,
    createCourses,
    updatedCourses,
    deletedCourses,
    
}


