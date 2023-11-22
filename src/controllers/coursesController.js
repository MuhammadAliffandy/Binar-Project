const CoursesService = require('../services/coursesService');

const readCourses = async () => {
    try {
        const data = await CoursesService.readCourses();
        return res.status(200).json(new CustomResponse("OK", "View all course data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const readCoursesById = async () => {
    try { 
        const payload = req.body;
        const data = await CoursesService.readCoursesById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all course data successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const createCourses = async () => {
    try {
        const user = req.user
        const payload = req.body;
        const data = await CoursesService.createCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "create course data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}


const updatedCourses = async () => {
    try {
        const user = req.user
        const payload = req.body;
        const data = await CoursesService.updatedCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "update course data has been successfully", data))

    } catch (error) {
        errorHandler(res, err)
    }
}

const deletedCourses = async() => {
    try {
        const user = req.user
        const payload = req.body;
        await CoursesService.deletedCourses(payload,user);
        return res.status(201).json(new CustomResponse("OK", "deleted course data has been successfully"))

    } catch (error) {
        errorHandler(res, err)
    }
}

module.exports = {
    readCourses,
    readCoursesById,
    createCourses,
    updatedCourses,
    deletedCourses,
}


