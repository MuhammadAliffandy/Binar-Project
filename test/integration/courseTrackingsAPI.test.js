const request = require('supertest');
const app = require('../../index');

const courseId = "fc24b5a8-9d6f-47a6-aa4d-8a5076e98c81";
const userDummy = "70ac73fe-86d4-43eb-b37d-4f36eb6a9357";

beforeAll(async () => {

    const auth = await request(app)
                .post('/auth/login')
                .send({
                    emailOrPhone: "maliffandy@gmail.com",
                    password: "fandy123"
                }) 
    token = auth.body.data.accessToken;

    const createCourseTracking = await request(app)
                        .post('/courseTrackings')
                        .set('Authorization',`Bearer ${token}`)
                        .send({
                            status : "PROGRESS",
                            userId: "7e280cde-c616-4c32-9e7a-8d6e7f700e25",
                            courseId: courseId
                        })
    courseTrackingDummy = createCourseTracking.body.data.id;
})

describe('courseTrackings API', () => {
    describe('GET /courseTrackings', () => {
        it('should return list module tracking data', async () => {
            const res = await request(app)
                .get('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /courseTrackings/search', () => {
        it('should return module tracking data', async () => {
            const res = await request(app)
                .post('/courseTrackings/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: courseTrackingDummy
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if data its not exist', async () => {
            const res = await request(app)
                .post('/courseTrackings/search')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: '21edada'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 
    });

    describe('POST /courseTrackings', () => {
        it('should return create module tracking data', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    status : "PROGRESS",
                    userId: userDummy,
                    courseId: courseId
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if body is null', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    status : "PROGRESS",
                    courseId: courseId,
                    userId: userDummy
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid data structure', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    title: "Dummy Module tracking",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });

    describe('PUT /courseTrackings', () => {
        it('should return update module tracking data', async () => {
            const res = await request(app)
                .put('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: courseTrackingDummy,
                    status : "DONE",
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if data not exist', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: "dasdadas",
                    status : "DONE",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    id: courseTrackingDummy,
                    statusA : "DONE",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });
    
});
