const ModuleTrackingsController = require("../../src/controllers/moduleTrackingController");
const ModuleTrackingsService = require("../../src/services/moduleTrackingService")
const CustomResponse = require("../../lib/customResponse");

jest.mock('../../src/services/moduleTrackingService', () => ({ 
    readModuleTracking : jest.fn(),
    readModuleTrackingById : jest.fn(),
    createModuleTracking: jest.fn(),
    updatedModuleTracking: jest.fn(),
}));

describe('#moduleTrackingController', () => {
    describe('#readModuleTracking', () => {
        it('should return all module tracking data and status code 200 ', async () => {

            const moduleTracking = [{
                id: "1",
                status : "PROGRESS",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            }];

            const mockReq = {}

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModuleTrackingsService.readModuleTracking.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.readModuleTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View all module tracking data successfully", moduleTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModuleTrackingsService.readModuleTracking.mockRejectedValue(mockError);

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModuleTrackingsController.readModuleTracking(null,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#readModuleTrackingById', () => {
        it('should return module tracking data and status code 200 ', async () => {

            const moduleTracking = {
                id: "1",
                status : "PROGRESS",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };


            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModuleTrackingsService.readModuleTrackingById.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.readModuleTrackingById(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View module tracking data successfully", moduleTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModuleTrackingsService.readModuleTrackingById.mockRejectedValue(mockError);

            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModuleTrackingsController.readModuleTrackingById(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#createModuleTracking', () => {
        it('should create module tracking data and status code 201 ', async () => {

            const moduleTracking = {
                id: "1",
                status : "PROGRESS",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };


            const mockReq = {
                body : {
                    ...moduleTracking
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModuleTrackingsService.createModuleTracking.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.createModuleTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "create module tracking data has been successfully", moduleTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModuleTrackingsService.createModuleTracking.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModuleTrackingsController.createModuleTracking(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#updatedModuleTracking', () => {
        it('should update module tracking data and status code 201 ', async () => {

            const moduleTracking = {
                id: "1",
                status : "DONE",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };

            const mockReq = {
                body : {
                    status : "DONE",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModuleTrackingsService.updatedModuleTracking.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.updatedModuleTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "update module tracking data has been successfully", moduleTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModuleTrackingsService.updatedModuleTracking.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModuleTrackingsController.updatedModuleTracking(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#createValidation', () => {
        it('should return req body is null and status 400 ', async () => {

            const mockReq = {
                body : null
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModuleTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "req body is Undefined , Please check your input ! ")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure and status 400 ', async () => {

            const mockReq = {
                body : {
                    status : "DONE",
                    userId: "1",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModuleTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure if input is array type and status 400 ', async () => {

            const requireData = [
                "status" , "userId" , "moduleId" 
            ];

            const mockReq = {
                body : [
                    {
                        statusA : "PROGRESS",
                        userId: "1",
                        moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                    },
                    {
                        statusA : "PROGRESS",
                        userId: "1",
                        moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                    },
                ]
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModuleTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid sort data and status 400 ', async () => {
            const requireData = [
                "status" , "userId" , "moduleId" 
            ];

            const mockReq = {
                body : {
                    userId: "1",
                    status : "PROGRESS",
                    moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModuleTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return next', async () => {;

            const mockReq = {
                body : {
                    status : "PROGRESS",
                    userId: "1",
                    moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModuleTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });
    
    describe('#updateValidation', () => {

        it('should return data its not found dan status code 400', async () => {
            
            const mockReq = {
                body : null
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModuleTrackingsService.readModuleTrackingById.mockReturnValue(null)

            await ModuleTrackingsController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should invalid data structure and status code 400', async () => {

            const moduleTracking = {
                statusA : "PROGRESS",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };
            
            const mockReq = {
                body : {
                    id : "1",
                    statusA : "PROGRESS",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModuleTrackingsService.readModuleTrackingById.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should return next', async () => {;

            const moduleTracking= {
                status : "PROGRESS",
                userId: "1",
                moduleId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };

            const mockReq = {
                body : {
                    id : "1",
                    status : "PROGRESS",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModuleTrackingsService.readModuleTrackingById.mockReturnValue(moduleTracking);
            await ModuleTrackingsController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    })
    
    describe('#checkValidation', () => {

        it('should return data its not found dan status code 400', async () => {
            
            const mockReq = {
                body : null
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModuleTrackingsService.readModuleTrackingById.mockReturnValue(null)

            await ModuleTrackingsController.checkValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
    })


});
