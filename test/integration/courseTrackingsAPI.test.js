const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    const createCourseTracking = await request(app)
                        .post('/courseTrackings')
                        .send({
                            status : "PROGRESS",
                            userId: "1",
                            courseId: "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                        })
    courseTrackingDummy = createCourseTracking.body.data.id;
})

describe('moduleTrackings API', () => {
    describe('GET /courseTrackings', () => {
        it('should return list module tracking data', async () => {
            const res = await request(app)
                .get('/courseTrackings');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /courseTrackings/search', () => {
        it('should return module tracking data', async () => {
            const res = await request(app)
                .post('/courseTrackings/search')
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
                .send({
                    status : "PROGRESS",
                    userId: "1",
                    courseId: "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if body is null', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/courseTrackings')
                .send({
                    status : "PROGRESS",
                    courseId: "5b76fce4-a584-4d47-9c70-fb38e9b5d502",
                    userId: "1"
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid data structure', async () => {
            const res = await request(app)
                .post('/courseTrackings')
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
