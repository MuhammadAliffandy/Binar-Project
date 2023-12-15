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
        return res.status(200).json(new CustomResponse("OK", "View course tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readCourseTrackingByUser = async (req,res) => {
    try { 

        const userId = req.user.id;
        const payload = { userId };
        const data = await CourseTrackingService.readCourseTrackingByUser(payload)
        return res.status(200).json(new CustomResponse("OK", "View course tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readCourseTrackingByUserTrack = async (req,res) => {
    try { 

        const userId = req.user.id;
        const payload = { userId , ...req.body  };
        const data = await CourseTrackingService.readCourseTrackingByUserTrack(payload)
        return res.status(200).json(new CustomResponse("OK", "View course tracking data successfully", data))

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

const createValidation = async(req , res , next) => {

    const body = req.body

    if( body == null ){
        return res.status(400).json(new CustomResponse("FAIL", "req body is Undefined , Please check your input ! "));
    }

    const requireData = [
        "status" , "userId" , "courseId" 
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

        if(Object.keys(body).length < 3 || Object.keys(body).length > 3  ){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input`))
        }
        const isChecked = Object.keys(body).every((key , i)=>{
            return key === requireData[i];
        });
        if(!isChecked){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`))
        }
    }

    const isTracking = await CourseTrackingService.readCourseTrackingByUserTrack(body);
    
    if(isTracking.length > 0){
        return res.status(400).json(new CustomResponse("FAIL", `Course is running now`))
    }

    next();

}

const updateValidation = async(req , res , next) => {

    let body = req.body;

    const requireData = [
        "id","status" , "userId" , "courseId" 
    ];

    const isExisting = await CourseTrackingService.readCourseTrackingById(body);

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

    const isExisting = await CourseTrackingService.readCourseTrackingById(body);
    
    if(isExisting === null){
        return res.status(400).json(new CustomResponse("FAIL", "data its not found"))
    }

    next();

}

module.exports = {
    readCourseTracking,
    readCourseTrackingById,
    readCourseTrackingByUser,
    readCourseTrackingByUserTrack,
    checkValidation,
    createCourseTracking,
    updatedCourseTracking,
    createValidation,
    updateValidation,
}


