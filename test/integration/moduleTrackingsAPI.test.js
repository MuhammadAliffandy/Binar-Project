const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    const createModule = await request(app)
                        .post('/modules')
                        .send({
                            title: "Dummy Module tracking",
                            video: "www.video.lol",
                            time: 45,
                            courseId : "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                        })
    moduleDummy = createModule.body.data.id;

    const createModuleTracking = await request(app)
                        .post('/moduleTrackings')
                        .send({
                            status : "PROGRESS",
                            userId: "1",
                            moduleId: moduleDummy
                        })
    moduleTrackingDummy = createModuleTracking.body.data.id;
})

describe('moduleTrackings API', () => {
    describe('GET /moduleTrackings', () => {
        it('should return list module tracking data', async () => {
            const res = await request(app)
                .get('/moduleTrackings');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /moduleTrackings/search', () => {
        it('should return module tracking data', async () => {
            const res = await request(app)
                .post('/moduleTrackings/search')
                .send({
                    id: moduleTrackingDummy
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if data its not exist', async () => {
            const res = await request(app)
                .post('/moduleTrackings/search')
                .send({
                    id: '21edada'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 
    });

    describe('POST /moduleTrackings', () => {
        it('should return create module tracking data', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .send({
                    status : "PROGRESS",
                    userId: "1",
                    moduleId: moduleDummy
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if body is null', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .send({
                    status : "PROGRESS",
                    moduleId: moduleDummy,
                    userId: "1"
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid data structure', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .send({
                    title: "Dummy Module tracking",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });

    describe('PUT /moduleTrackings', () => {
        it('should return update module tracking data', async () => {
            const res = await request(app)
                .put('/moduleTrackings')
                .send({
                    id: moduleTrackingDummy,
                    status : "DONE",
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if data not exist', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
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
                .post('/moduleTrackings')
                .send({
                    id: moduleTrackingDummy,
                    statusA : "DONE",
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

    });
    
});
