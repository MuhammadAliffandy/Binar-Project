const ModulesService = require('../services/modulesService');
const CustomResponse = require("../../lib/customResponse");
const errorHandler = require("../../lib/errorHandler");

const readModulesById = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.readModulesById(payload);
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const readModules = async (req,res) => {
    try {
        const data = await ModulesService.readModules();
        return res.status(200).json(new CustomResponse("OK", "View all module data successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const createModules = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.createModules(payload);
        return res.status(201).json(new CustomResponse("OK", "create module data has been successfully", data))

    } catch (err) {
        errorHandler(res, err)
    }
}

const updatedModules = async (req,res) => {
    try {
        const payload = req.body;
        const data = await ModulesService.updatedModules(payload);
        return res.status(201).json(new CustomResponse("OK", "update module data has been successfully", data))

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
        "title" , "video" , "time", "courseId" 
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

        if(Object.keys(body).length < 4 || Object.keys(body).length > 4  ){
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
        "id","title" , "video" , "time", "courseId" 
    ];

    const isExisting = await ModulesService.readModulesById(body);

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

module.exports = {
    readModules,
    readModulesById,
    createModules,
    updatedModules,
    createValidation,
    updateValidation,
}


