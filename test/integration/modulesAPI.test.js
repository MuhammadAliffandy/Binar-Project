const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    const createModule = await request(app)
                        .post('/modules')
                        .send({
                            title: "Dummy Modules",
                            video: "www.video.lol",
                            time: 45,
                            courseId : "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                        })
    moduleDummy = createModule.body.data.id;
})

describe('modules API', () => {
    describe('GET /modules', () => {
        it('should return list modules data', async () => {
            const res = await request(app)
                .get('/modules');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        });
        
    });

    describe('POST /modules/search', () => {
        it('should return modules data', async () => {
            const res = await request(app)
                .post('/modules/search')
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
                .send({
                    title: "Dummy Modules",
                    video: "www.video.lol",
                    time: 45,
                    courseId: "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if body is null', async () => {
            const res = await request(app)
                .post('/modules')
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if invalid sort data structure', async () => {
            const res = await request(app)
                .post('/modules')
                .send({
                    titleA: "Dummy Modules",
                    video: "www.video.lol",
                    time: 45,
                    courseId: "5b76fce4-a584-4d47-9c70-fb38e9b5d502"
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
        }); 

        it('should return modules data if invalid data structure', async () => {
            const res = await request(app)
                .post('/modules')
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
