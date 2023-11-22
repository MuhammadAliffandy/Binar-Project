const courseTrackingRepository = require('../repositories/courseTrackingRepository');

const readCourseTracking = () => {
    return courseTrackingRepository.readCourseTracking();
}

const readCourseTrackingById = (payload) => {
    return courseTrackingRepository.readCourseTrackingById(payload)
}

const createCourseTracking = (payload , userId) => {
    return courseTrackingRepository.createCourseTracking(payload,userId) 
}

const updatedCourseTracking = (payload , userId) => {
    return courseTrackingRepository.updatedCourseTracking(payload,userId)
}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    createCourseTracking,
    updatedCourseTracking,
}


