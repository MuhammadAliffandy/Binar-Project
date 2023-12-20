const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {


    const auth = await request(app)
                .post('/auth/login')
                .send({
                    emailOrPhone: "maliffandy@gmail.com",
                    password: "fandy123"
                }) 
    token = auth.body.data.accessToken;

    const auth0 = await request(app)
                .post('/auth/admin/login')
                .send({
                    emailOrPhone: "anos@gmail.com",
                    password: "anos123"
                })   
                
    tokenAdmin = auth0.body.data.accessToken;
                
    const createCourse = await request(app)
                        .post('/courses')
                        .set('Authorization',`Bearer ${tokenAdmin}`)
                        .send({
                                title: "Introduction to Python Programming",
                                image: "python_intro_image.jpg",
                                subtitle: "Master the fundamentals of Python with hands-on examples.",
                                description: "This comprehensive guide covers Python basics, data structures, and problem-solving techniques. Ideal for beginners and those looking to strengthen their programming skills.",
                                classCode: "PY101",
                                type: "FREE",
                                authorBy: "John Doe",
                                rating: 4.5,
                                price: 2999999,
                                level: "BEGINNER",
                                telegram : 'www.tele.com',
                                categoryId: "21020ab7-e3b0-45c6-a800-16494a92eb0d"
                            })                        
    courseDummy = createCourse.body.data.id;
},10000 )

describe('courses API', () => {
    describe('GET /courses', () => {
        it('should return list courses data', async () => {
            const res = await request(app)
                .get('/courses')
                .set('Authorization',`Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /courses/search', () => {
        it('should return courses data', async () => {
            const res = await request(app)
                .post('/courses/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: courseDummy
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if data its not exist', async () => {
            const res = await request(app)
                .post('/courses/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: '21edada'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 
    });

    describe('POST /courses', () => {
        it('should return create courses data', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    title: "Introduction to Python Programming",
                    image: "python_intro_image.jpg",
                    subtitle: "Master the fundamentals of Python with hands-on examples.",
                    description: "This comprehensive guide covers Python basics, data structures, and problem-solving techniques. Ideal for beginners and those looking to strengthen their programming skills.",
                    classCode: "PY101",
                    type: "FREE",
                    authorBy: "John Doe",
                    rating: 4.5,
                    price: 2999999,
                    level: "BEGINNER",
                    telegram : 'www.tele.com',
                    categoryId: "21020ab7-e3b0-45c6-a800-16494a92eb0d"
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if body is null', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    titleA: "Introduction to Python Programming",
                    image: "python_intro_image.jpg",
                    subtitle: "Master the fundamentals of Python with hands-on examples.",
                    description: "This comprehensive guide covers Python basics, data structures, and problem-solving techniques. Ideal for beginners and those looking to strengthen their programming skills.",
                    classCode: "PY101",
                    type: "FREE",
                    authorBy: "John Doe",
                    rating: 4.5,
                    price: 2999999,
                    level: "BEGINNER",
                    telegram : 'www.tele.com',
                    categoryId: "c46a83ec-ed52-4245-bfbc-5afb90b4b282"
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if invalid data structure', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    title: "Dummy Courses",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });

    describe('PUT /courses', () => {
        it('should return update courses data', async () => {
            const res = await request(app)
                .put('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: courseDummy,
                    title: "Dummy Courses",
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if data not exist', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: "dasdadas",
                    title: "Dummy Courses",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return courses data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/courses')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: courseDummy,
                    titleA: "Dummy Courses",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });
    
});
