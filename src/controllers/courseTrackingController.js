const CourseTrackingService = require('../services/courseTrackingService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const readCourseTracking = async(req,res) => {
    try {
        const data = await CourseTrackingService.readCourseTracking();
        return res.status(200).json(new CustomResponse("OK", "View all course tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readCourseTrackingById = async (req,res) => {
    try { 
        const payload = req.body;
        const data = await CourseTrackingService.readCourseTrackingById(payload)
        return res.status(200).json(new CustomResponse("OK", "View all course tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createCourseTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await CourseTrackingService.createCourseTracking(payload) 
        return res.status(201).json(new CustomResponse("OK", "create course tracking data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedCourseTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await CourseTrackingService.updatedCourseTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "update course tracking data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    createCourseTracking,
    updatedCourseTracking,
}


