const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourses = (payload) => {
    return prisma.Course.findUnique({
        where : {
            id : ''
        }
    });
}

const readCoursesById = () => {
    return prisma.Course.findMany();
}

const createCourses = (payload , userId) => {
    return prisma.Course.create({
        data  : {
            // property
            id : uuidv4(),
            title : "",
            image : '',
            subtitle: '',
            description : '',
            classCode: '',
            type : '',
            authorBy: '',
            rating: '',
            price: '',
            level: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: '',
            // relation data
            createdBy:'',
            updatedBy: '',
            deletedBy: '',
            categoryId: ''
        }
    }) 
}

const updatedCourses = (payload , userId) => {
    return prisma.Course.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',
            // relation data
            updatedBy: ''
        }
    }) 
}

const deletedCourses = (payload , userId) => {
    return prisma.Course.update({
        data  : {
            // property
            ...payload,
            deletedAt: '',
            // relation data
            deletedBy: '',
        }
    }) 
}

