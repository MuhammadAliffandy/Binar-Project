const CoursesRepository = require('../repositories/coursesRepository');

const readCourses = () => {
    return CoursesRepository.readCourses();
}

const readCoursesById = (payload) => {
    return CoursesRepository.readCoursesById(payload);
}
const readCoursesByCategory = (payload) => {
    return CoursesRepository.readCoursesByCategory(payload);
}

const readCoursesByLevel = (payload) => {
    return CoursesRepository.readCoursesByLevel(payload);
}

const createCourses = (payload , userId) => {
    return CoursesRepository.createCourses(payload,userId);
}

const updatedCourses = (payload , userId) => {
    return CoursesRepository.updatedCourses(payload,userId)
}

const deletedCourses = (payload , userId) => {
    return CoursesRepository.deletedCourses(payload,userId)
}

module.exports = {
    readCourses,
    readCoursesById,
    readCoursesByCategory,
    readCoursesByLevel,
    createCourses,
    updatedCourses,
    deletedCourses,
}


