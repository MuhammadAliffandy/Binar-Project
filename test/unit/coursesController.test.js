const CoursesController = require('../../src/controllers/coursesController');
const CoursesService = require('../../src/services/coursesService');
const CustomResponse = require("../../lib/customResponse");

jest.mock('../../src/services/coursesService', () => ({ 
    readCourses : jest.fn(),
    readCoursesById : jest.fn(),
    readCoursesByCategory: jest.fn(),
    createCourses: jest.fn(),
    updatedCourses: jest.fn(),
    deletedCourses: jest.fn()
}));


describe('#coursesController', () => {
    describe('#readCourses', () => {
        it('should return all course data and status code 200 ', async () => {

            const course = [{
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
            }];

            const mockReq = {}

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CoursesService.readCourses.mockReturnValue(course);
            await CoursesController.readCourses(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View all course data successfully", course)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.readCourses.mockRejectedValue(mockError);

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.readCourses(null,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#readCoursesById', () => {
        it('should return course data and status code 200 ', async () => {

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
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

            CoursesService.readCoursesById.mockReturnValue(course);
            await CoursesController.readCoursesById(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View course data successfully", course)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.readCoursesById.mockRejectedValue(mockError);

            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.readCoursesById(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#readCoursesByCategory', () => {
        it('should return course data by category and status code 200 ', async () => {

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
            };

            const mockReq = {
                body : {
                    categoryId : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CoursesService.readCoursesByCategory.mockReturnValue(course);
            await CoursesController.readCoursesByCategory(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "View course data successfully", course)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.readCoursesByCategory.mockRejectedValue(mockError);

            const mockReq = {
                body : {
                    id : "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.readCoursesByCategory(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#createCourses', () => {
        it('should create course data and status code 201 ', async () => {

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
            };

            const mockReq = {
                body : {
                    ...course[1]
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CoursesService.createCourses.mockReturnValue(course);
            await CoursesController.createCourses(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "create course data has been successfully", course)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.createCourses.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.createCourses(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#updatedCourses', () => {
        it('should update course data and status code 201 ', async () => {

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
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

            CoursesService.updatedCourses.mockReturnValue(course);
            await CoursesController.updatedCourses(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "update course data has been successfully", course)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.updatedCourses.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.updatedCourses(mockReq,mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL",mockError.message)
            );
        });
        
    });

    describe('#deletedCourses', () => {
        it('should update course data and status code 201 ', async () => {

            const mockReq = {
                body : {
                    id : "1",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            CoursesService.deletedCourses.mockReturnValue(null);
            await CoursesController.deletedCourses(mockReq,mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("OK", "deleted course data has been successfully", null)
            );

        });

        it('should return error status 500 on failure ', async () => {
            const mockError = new Error();
    
            CoursesService.deletedCourses.mockRejectedValue(mockError);

            const mockReq = {
                body : {}
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CoursesController.deletedCourses(mockReq,mockRes);
    
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

            await CoursesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "req body is Undefined , Please check your input ! ")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure and status 400 ', async () => {

            const mockReq = {
                body : {
                    title: "Dummy Title",
                    image: "dummy_image.jpg",
                    subtitle: "Dummy Subtitle",
                    description: "Dummy Description",
                    classCode: "ABC123",
                    type: "FREE",
                    authorBy: "Dummy Author",
                    rating: 4.5,
                    price: 19.99,
                    level: "INTERMEDIATE"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CoursesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid data structure if input is array type and status 400 ', async () => {

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

            const mockReq = {
                body : [
                    {
                        title: "Dummy Title",
                        image: "dummy_image.jpg",
                        subtitle: "Dummy Subtitle",
                        description: "Dummy Description",
                        classCode: "ABC123",
                        type: "FREE",
                        authorBy: "Dummy Author",
                        level: "INTERMEDIATE",
                        categoryId: "1",
                    },
                    {
                        title: "Dummy Title",
                        image: "dummy_image.jpg",
                        subtitle: "Dummy Subtitle",
                        description: "Dummy Description",
                        classCode: "ABC123",
                        type: "FREE",
                        authorBy: "Dummy Author",
                        level: "INTERMEDIATE",
                        categoryId: "1",
                    },
                ]
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CoursesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should invalid sort data and status 400 ', async () => {

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

            const mockReq = {
                body : {
                    title: "Dummy Title",
                    image: "dummy_image.jpg",
                    subtitle: "Dummy Subtitle",
                    type: "FREE",
                    classCode: "ABC123",
                    description: "Dummy Description",
                    rating: 4.5,
                    authorBy: "Dummy Author",
                    price: 19.99,
                    level: "INTERMEDIATE",
                    categoryId: "1"
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CoursesController.createValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", `Invalid data structure. Please check your input and must to be ${requireData}`)
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return next', async () => {;

            const mockReq = {
                body : {
                    title: "Dummy Title",
                    image: "dummy_image.jpg",
                    subtitle: "Dummy Subtitle",
                    description: "Dummy Description",
                    classCode: "ABC123",
                    type: "FREE",
                    authorBy: "Dummy Author",
                    rating: 4.5,
                    price: 19.99,
                    level: "INTERMEDIATE",
                    categoryId: "1",
                }
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            await CoursesController.createValidation(mockReq,mockRes,mockNext);

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

            CoursesService.readCoursesById.mockReturnValue(null)

            await CoursesController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should invalid data structure and status code 400', async () => {

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
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

            CoursesService.readCoursesById.mockReturnValue(course);
            await CoursesController.updateValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "Invalid data structure. Please check your input")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
        it('should return next', async () => {;

            const course = {
                id : "1",
                title: "Dummy Title",
                image: "dummy_image.jpg",
                subtitle: "Dummy Subtitle",
                description: "Dummy Description",
                classCode: "ABC123",
                type: "FREE",
                authorBy: "Dummy Author",
                rating: 4.5,
                price: 19.99,
                level: "INTERMEDIATE",
                categoryId: "1",
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

            CoursesService.readCoursesById.mockReturnValue(course);
            await CoursesController.updateValidation(mockReq,mockRes,mockNext);

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

            CoursesService.readCoursesById.mockReturnValue(null)

            await CoursesController.checkValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
    })

    describe('#checkCategoryValidation', () => {

        it('should return data its not found dan status code 400', async () => {
            
            const mockReq = {
                body : null
            }

            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const mockNext = jest.fn();

            CoursesService.readCoursesByCategory.mockReturnValue(null)

            await CoursesController.checkCategoryValidation(mockReq,mockRes,mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                new CustomResponse("FAIL", "data its not found")
            );
            expect(mockNext).not.toHaveBeenCalled();
        });
        
    })


});
