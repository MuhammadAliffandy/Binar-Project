const ModulesController = require("../../src/controllers/modulesController");
const ModulesService = require("../../src/services/modulesService")
const CustomResponse = require("../../lib/customResponse");

jest.mock('../../src/services/modulesService', () => ({ 
    readModules : jest.fn(),
    readModulesById : jest.fn(),
    createModules: jest.fn(),
    updatedModules: jest.fn(),
}));


describe('#modulesController', () => {
    describe('#readModules', () => {
        it('should return all modules data and status code 200 ', async () => {

            const modules = [{
                id: "1",
                title: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
            }];

            const mockReq = {}

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModulesService.readModules.mockReturnValue(modules);
            await ModulesController.readModules(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View all module data successfully", modules)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModulesService.readModules.mockRejectedValue(mockError);

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModulesController.readModules(null,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#readModulesById', () => {
        it('should return module data and status code 200 ', async () => {

            const modules = {
                id: "1",
                title: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
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

            ModulesService.readModulesById.mockReturnValue(modules);
            await ModulesController.readModulesById(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View module data successfully", modules)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModulesService.readModulesById.mockRejectedValue(mockError);

            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModulesController.readModulesById(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#createModules', () => {
        it('should create module data and status code 201 ', async () => {

            const modules = {
                id: "1",
                title: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
            };

            const mockReq = {
                body : {
                    ...modules
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModulesService.createModules.mockReturnValue(modules);
            await ModulesController.createModules(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "create module data has been successfully", modules)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModulesService.createModules.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModulesController.createModules(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#updatedModules', () => {
        it('should update module tracking data and status code 201 ', async () => {

            const modules = {
                id: "1",
                title: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
            };

            const mockReq = {
                body : {

                    title: "Dummy Modules",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            ModulesService.updatedModules.mockReturnValue(modules);
            await ModulesController.updatedModules(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "update module data has been successfully", modules)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            ModulesService.updatedModules.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await ModulesController.updatedModules(mockReq,mockRes);
    
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

            await ModulesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "req body is Undefined , Please check your input ! ")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure and status 400 ', async () => {

            const mockReq = {
                body : {
                    title: "Dummy Modules",
                    video: "www.video.lol",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModulesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure if input is array type and status 400 ', async () => {

            const requireData = [
                "title" , "video" , "time", "courseId" ,"chapter"
            ]

            const mockReq = {
                body : [
                    {
                        titleA: "Dummy Modules",
                        video: "www.video.lol",
                        time: 45,
                        courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                        chapter : 1
                    },
                    {
                        titleA: "Dummy Modules",
                        video: "www.video.lol",
                        time: 45,
                        courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                        chapter : 1
                    },
                ]
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModulesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid sort data and status 400 ', async () => {
            const requireData = [
                "title" , "video" , "time", "courseId" , "chapter"
            ]

            const mockReq = {
                body : {
                    title: "Dummy Modules",
                    courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                    video: "www.video.lol",
                    time: 45,
                    chapter : 1
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModulesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return next', async () => {;

            const mockReq = {
                body : {
                    title: "Dummy Modules",
                    video: "www.video.lol",
                    time: 45,
                    courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                    chapter : 1
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await ModulesController.createValidation(mockReq,mockRes,mockNext);

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

            ModulesService.readModulesById.mockReturnValue(null)

            await ModulesController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should invalid data structure and status code 400', async () => {

            const modules = {
                titleA: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
            };
            
            const mockReq = {
                body : {
                    id : "1",
                    titleA: "Dummy Title",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModulesService.readModulesById.mockReturnValue(modules);
            await ModulesController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should return next', async () => {;

            const modules = {
                title: "Dummy Modules",
                video: "www.video.lol",
                time: 45,
                courseId : "a5bb229a-1a88-4195-b12c-e70f1d447022",
                chapter : 1
            };

            const mockReq = {
                body : {
                    id : "1",
                    title: "Dummy Title",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            ModulesService.readModulesById.mockReturnValue(modules);
            await ModulesController.updateValidation(mockReq,mockRes,mockNext);

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

            ModulesService.readModulesById.mockReturnValue(null)

            await ModulesController.checkValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
    })


});
