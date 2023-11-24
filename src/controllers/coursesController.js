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

const createValidation = async(req , res , next) => {

    const body = req.body

    if( body == null ){
        return res.status(400).json({
            status : "FAIL",
            message : `req body is Undefined , Please check your input ! `
        });
    }

    const requireData = [
        'title',
        'image',
        'subtitle',
        'description',
        'classCode',
        'type',
        'authorBy',
        'rating',
        'price',
        'level',
        'categoryId',
    ];
    
    if(Array.isArray(body)){
        const isCheckedData = body.map((car)=> { 
            const currentData = Object.keys(car);
                return currentData.every((key , i)=>{
                    return key === requireData[i];
                })
        })
        if(isCheckedData.indexOf(false) > -1){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`))
        }
    }else{

        if(Object.keys(body).length < 11 || Object.keys(body).length > 11  ){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input`))
        }
        const isChecked = Object.keys(body).every((key , i)=>{
            return key === requireData[i];
        });
        if(!isChecked){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`))
        }
    }

    next();

}


const updateValidation = async(req , res , next) => {

    let body = req.body;

    const requireData = [
        'id',
        'title',
        'image',
        'subtitle',
        'description',
        'classCode',
        'type',
        'authorBy',
        'rating',
        'price',
        'level',
        'categoryId',
    ];

    
    const isExisting = await CoursesService.readCoursesById(body);
    
    if(isExisting === null){
        return res.status(400).json(new CustomResponse("FAIL", "data its not found"))
    }
    if(body != null){

        const isChecked = Object.keys(body).map((key)=>{
            return requireData.indexOf(key) ;
        })
    
        if( isChecked.indexOf(-1) > -1 ){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input`))
        }
    }

    next();

}

const checkValidation = async(req , res , next) => {

    const body = req.body;

    const isExisting = await CoursesService.readCoursesById(body);
    
    if(isExisting === null){
        return res.status(400).json(new CustomResponse("FAIL", "data its not found"))
    }

    next();

}



module.exports = {
    readCourses,
    readCoursesById,
    readCoursesByCategory,
    checkValidation,
    createCourses,
    createValidation,
    updateValidation,
    updatedCourses,
    deletedCourses,
}


