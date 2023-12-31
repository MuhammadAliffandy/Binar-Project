const ModuleTrackingService = require('../services/moduleTrackingService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const readModuleTrackingById = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.readModuleTrackingById(payload);
        return res.status(200).json(new CustomResponse("OK", "View module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readModuleTrackingByUser = async (req,res) => {
    try {
        const userId = req.user.id;
        const payload = { userId };
        const data = await ModuleTrackingService.readModuleTrackingByUser(payload);
        return res.status(200).json(new CustomResponse("OK", "View module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}
const readModuleTrackingByUserTrack = async (req,res) => {
    try {
        const userId = req.user.id;
        const payload = { userId , ...req.body  };
        const data = await ModuleTrackingService.readModuleTrackingByUserTrack(payload);
        return res.status(200).json(new CustomResponse("OK", "View module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readModuleTracking = async (req,res) => {
    try {
        const data = await ModuleTrackingService.readModuleTracking();
        return res.status(200).json(new CustomResponse("OK", "View all module tracking data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createModuleTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.createModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "create module tracking data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedModuleTracking = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModuleTrackingService.updatedModuleTracking(payload)
        return res.status(201).json(new CustomResponse("OK", "update module tracking data has been successfully", data))

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
        "status" , "userId" , "moduleId" 
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
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input`));
        }
        const isChecked = Object.keys(body).every((key , i)=>{
            return key === requireData[i];
        });
        if(!isChecked){
            return res.status(400).json(new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`))
        }
    }

    const isTracking = await ModuleTrackingService.readModuleTrackingByUserTrack(body);
    
    console.log(isTracking)

    if(isTracking.length > 0){
        return res.status(400).json(new CustomResponse("FAIL", `Module is running now`))
    }

    next();

}

const updateValidation = async(req , res , next) => {

    let body = req.body;

    const requireData = [
        "id","status" , "userId" , "moduleId" 
    ];

    const isExisting = await ModuleTrackingService.readModuleTrackingById(body);

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

    const isExisting = await ModuleTrackingService.readModuleTrackingById(body);
    
    if(isExisting === null){
        return res.status(400).json(new CustomResponse("FAIL", "data its not found"))
    }

    next();

}

module.exports = {
    readModuleTracking,
    readModuleTrackingById,
    readModuleTrackingByUser,
    readModuleTrackingByUserTrack,
    checkValidation,
    createModuleTracking,
    updatedModuleTracking,
    createValidation,
    updateValidation
}


