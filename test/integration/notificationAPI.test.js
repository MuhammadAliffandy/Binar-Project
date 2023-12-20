const supertest = require('supertest');
const app = require('../../index');

describe('Notification API Integration Tests', () => {
  let userToken;

  const userCredentials = {
    emailOrPhone: 'cobacoba110802@gmail.com',
    password: 'password123',
  };

  beforeAll(async () => {
    const userResponse = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

    userToken = userResponse.body.data.accessToken;
  });

  it('should create a new notification', async () => {
    const notificationData = {
      title: "Discount",
      subtitle: "50% All Course",
      description: "Terms and Conditions Apply"
    }

    const response = await supertest(app)
        .post('/notification')
        .set('Authorization', `Bearer ${userToken}`)
        .send(notificationData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Notification Created Successfully');
  });

  it('should update notification viewed status', async () => {
    const res = await supertest(app)
        .get('/notification/user')
        .set('Authorization', `Bearer ${userToken}`);

    const notificationId = res.body.data[0].id

    const response = await supertest(app)
        .put('/notification')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ notificationId });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Notification Viewed Updated Successfully');
  });

  it('should update all notifications viewed status', async () => {
    const response = await supertest(app)
        .put('/notification/user')
        .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('All Notification Viewed Updated Successfully');
  });

  it('should get all user notifications', async () => {
    const response = await supertest(app)
        .get('/notification/user')
        .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toBeDefined();
  });
});
