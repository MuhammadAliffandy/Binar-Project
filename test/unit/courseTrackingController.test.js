const CourseTrackingsController = require("../../src/controllers/courseTrackingController");
const CourseTrackingsService = require("../../src/services/courseTrackingService")
const CustomResponse = require("../../lib/customResponse");

jest.mock('../../src/services/courseTrackingService', () => ({ 
    readCourseTracking : jest.fn(),
    readCourseTrackingById : jest.fn(),
    createCourseTracking: jest.fn(),
    updatedCourseTracking: jest.fn(),
    readCourseTrackingByUserTrack: jest.fn()
}));

describe('#courseTrackingController', () => {
    describe('#readCourseTracking', () => {
        it('should return all course tracking data and status code 200 ', async () => {

            const courseTracking = [{
                id: "1",
                status : "PROGRESS",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            }];

            const mockReq = {}

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CourseTrackingsService.readCourseTracking.mockReturnValue(courseTracking);
            await CourseTrackingsController.readCourseTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View all course tracking data successfully", courseTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CourseTrackingsService.readCourseTracking.mockRejectedValue(mockError);

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CourseTrackingsController.readCourseTracking(null,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#readCourseTrackingById', () => {
        it('should return course tracking data and status code 200 ', async () => {

            const courseTracking = {
                id: "1",
                status : "PROGRESS",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
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

            CourseTrackingsService.readCourseTrackingById.mockReturnValue(courseTracking);
            await CourseTrackingsController.readCourseTrackingById(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View course tracking data successfully", courseTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CourseTrackingsService.readCourseTrackingById.mockRejectedValue(mockError);

            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CourseTrackingsController.readCourseTrackingById(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#createCourseTracking', () => {
        it('should create course tracking data and status code 201 ', async () => {

            const courseTracking = {
                id: "1",
                status : "PROGRESS",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
            };


            const mockReq = {
                body : {
                    ...courseTracking
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CourseTrackingsService.createCourseTracking.mockReturnValue(courseTracking);
            await CourseTrackingsController.createCourseTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "create course tracking data has been successfully", courseTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CourseTrackingsService.createCourseTracking.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CourseTrackingsController.createCourseTracking(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#updatedCourseTracking', () => {
        it('should update course tracking data and status code 201 ', async () => {

            const courseTracking = {
                id: "1",
                status : "DONE",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
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

            CourseTrackingsService.updatedCourseTracking.mockReturnValue(courseTracking);
            await CourseTrackingsController.updatedCourseTracking(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "update course tracking data has been successfully", courseTracking)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CourseTrackingsService.updatedCourseTracking.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CourseTrackingsController.updatedCourseTracking(mockReq,mockRes);
    
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

            await CourseTrackingsController.createValidation(mockReq,mockRes,mockNext);

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

            await CourseTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure if input is array type and status 400 ', async () => {

            const requireData = [
                "status" , "userId" , "courseId" 
            ];

            const mockReq = {
                body : [
                    {
                        statusA : "PROGRESS",
                        userId: "1",
                        courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                    },
                    {
                        statusA : "PROGRESS",
                        userId: "1",
                        courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                    },
                ]
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CourseTrackingsController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid sort data and status 400 ', async () => {
            const requireData = [
                "status" , "userId" , "courseId" 
            ];

            const mockReq = {
                body : {
                    userId: "1",
                    status : "PROGRESS",
                    courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CourseTrackingsController.createValidation(mockReq,mockRes,mockNext);

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
                    courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            CourseTrackingsService.readCourseTrackingByUserTrack.mockReturnValue([])
            await CourseTrackingsController.createValidation(mockReq,mockRes,mockNext);

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

            CourseTrackingsService.readCourseTrackingById.mockReturnValue(null)

            await CourseTrackingsController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should invalid data structure and status code 400', async () => {

            const courseTracking = {
                statusA : "PROGRESS",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
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

            CourseTrackingsService.readCourseTrackingById.mockReturnValue(courseTracking);
            await CourseTrackingsController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should return next', async () => {;

            const courseTracking= {
                status : "PROGRESS",
                userId: "1",
                courseId: "4917fb25-82cf-40f4-8a33-3ca02ec4796a"
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

            CourseTrackingsService.readCourseTrackingById.mockReturnValue(courseTracking);
            await CourseTrackingsController.updateValidation(mockReq,mockRes,mockNext);

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

            CourseTrackingsService.readCourseTrackingById.mockReturnValue(null)

            await CourseTrackingsController.checkValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
    })


});
