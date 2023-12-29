const request = require('supertest');
const app = require('../../index');


const moduleDummy = "a51e4d3a-09a5-4012-9492-61af1fadb1a5";
const userDummy = "70ac73fe-86d4-43eb-b37d-4f36eb6a9357";

beforeAll(async () => {


    const auth = await request(app)
                .post('/auth/login')
                .send({
                    emailOrPhone: "maliffandy@gmail.com",
                    password: "fandy123"
                }) 
    token = auth.body.data.accessToken;

    const createModuleTracking = await request(app)
                        .post('/moduleTrackings')
                        .set('Authorization',`Bearer ${token}`)
                        .send({
                            status : "PROGRESS",
                            userId: "7e280cde-c616-4c32-9e7a-8d6e7f700e25",
                            moduleId: moduleDummy
                        })
    moduleTrackingDummy = createModuleTracking.body.data.id;
}, 10000)

describe('moduleTrackings API', () => {
    describe('GET /moduleTrackings', () => {
        it('should return list module tracking data', async () => {
            const res = await request(app)
                .get('/moduleTrackings')
                .set('Authorization',`Bearer ${token}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /moduleTrackings/search', () => {
        it('should return module tracking data', async () => {
            const res = await request(app)
                .post('/moduleTrackings/search')
                .set('Authorization',`Bearer ${token}`)
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
                .set('Authorization',`Bearer ${token}`)
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
                .set('Authorization',`Bearer ${token}`)
                .send({
                    status : "PROGRESS",
                    userId: userDummy,
                    moduleId: moduleDummy
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if body is null', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    status : "PROGRESS",
                    moduleId: moduleDummy,
                    userId: userDummy
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return module tracking data if invalid data structure', async () => {
            const res = await request(app)
                .post('/moduleTrackings')
                .set('Authorization',`Bearer ${token}`)
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
                .set('Authorization',`Bearer ${token}`)
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
                .post('/moduleTrackings')
                .set('Authorization',`Bearer ${token}`)
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
