const request = require('supertest');
const app = require('../../index');

const courseId = "1d9b677c-f08a-4e42-bbc5-94d1df42c5c8";
const userDummy = "d6e3f245-95b2-45e3-8b97-ba81847ea46a";

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
                            userId: userDummy,
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
