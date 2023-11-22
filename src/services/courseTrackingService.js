const courseTrackingRepository = require('../repositories/courseTrackingRepository');

const readCourseTracking = () => {
    return courseTrackingRepository.readCourseTracking();
}

const readCourseTrackingById = (payload) => {
    return courseTrackingRepository.readCourseTrackingById(payload)
}

const createCourseTracking = (payload) => {
    return courseTrackingRepository.createCourseTracking(payload) 
}

const updatedCourseTracking = (payload) => {
    return courseTrackingRepository.updatedCourseTracking(payload)
}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    createCourseTracking,
    updatedCourseTracking,
}


