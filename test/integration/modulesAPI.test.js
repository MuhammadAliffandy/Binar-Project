const request = require('supertest');
const app = require('../../index');

const courseId = "dca21110-876d-4b1d-ba70-90339ce179d9";

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
                
    const createModule = await request(app)
                        .post('/modules')
                        .set('Authorization',`Bearer ${tokenAdmin}`)
                        .send({
                            title: "Dummy Modules",
                            video: "www.video.lol",
                            time: 45,
                            courseId : courseId,
                            chapter : 1
                            
                        })
    moduleDummy = createModule.body.data.id;
})

describe('modules API', () => {
    describe('GET /modules', () => {
        it('should return list modules data', async () => {
            const res = await request(app)
                .get('/modules')
                .set('Authorization',`Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /modules/search', () => {
        it('should return modules data', async () => {
            const res = await request(app)
                .post('/modules/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: moduleDummy
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if data its not exist', async () => {
            const res = await request(app)
                .post('/modules/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: '21edada'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 
    });

    describe('POST /modules', () => {
        it('should return create modules data', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    title: "Dummy Modules",
                    video: "www.video.lol",
                    time: 45,
                    courseId: courseId,
                    chapter : 1
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if body is null', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    titleA: "Dummy Modules",
                    video: "www.video.lol",
                    time: 45,
                    courseId: courseId,
                    chapter : 1
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if invalid data structure', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    title: "Dummy Modules",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });

    describe('PUT /modules', () => {
        it('should return update modules data', async () => {
            const res = await request(app)
                .put('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: moduleDummy,
                    title: "Dummy Modules",
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if data not exist', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: "dasdadas",
                    title: "Dummy Modules",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/modules')
                .set('Authorization',`Bearer ${tokenAdmin}`)
                .send({
                    id: moduleDummy,
                    titleA: "Dummy Modules",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });
    
});
