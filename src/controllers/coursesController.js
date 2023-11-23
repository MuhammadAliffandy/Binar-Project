const CoursesService = require('../services/coursesService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");


const readCourses = async (req,res) => {
    try {
        const data = await CoursesService.readCourses();
        return res.status(200).json(new CustomResponse("OK", "View all course data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readCoursesById = async (req,res) => {
    try { 
        const payload = req.body;
        const data = await CoursesService.readCoursesById(payload);
        return res.status(200).json(new CustomResponse("OK", "View course data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readCoursesByCategory = async (req,res) => {
    try { 
        const payload = req.body;
        const data = await CoursesService.readCoursesByCategory(payload);
        return res.status(200).json(new CustomResponse("OK", "View course data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createCourses = async (req,res) => {
    try {
        const user = req.user;
        const payload = req.body;
        const data = await CoursesService.createCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "create course data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedCourses = async (req,res) => {
    try {
        const user = req.user
        const payload = req.body;
        const data = await CoursesService.updatedCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "update course data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const deletedCourses = async(req,res) => {
    try {
        const user = req.user
        const payload = req.body;
        await CoursesService.deletedCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "deleted course data has been successfully"))

    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports = {
    readCourses,
    readCoursesById,
    readCoursesByCategory,
    createCourses,
    updatedCourses,
    deletedCourses,
}


