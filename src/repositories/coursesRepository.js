const prisma = require('../../lib/prisma')
const { v4: uuidv4 } = require('uuid');

const readCourses = () => {
    return prisma.Courses.findMany();
}

const createCourses = (payload , userId) => {
    return prisma.Courses.create({
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
    return prisma.Courses.update({
        data  : {
            // property
            ...payload,
            updatedAt: '',
            // relation data
            updatedBy: ''
        }
    }) 
}

