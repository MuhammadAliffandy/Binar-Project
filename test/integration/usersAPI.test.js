const supertest = require('supertest');
const app = require('../../index');

describe('User API Integration Tests', () => {
  let adminToken;
  let userToken;

  const adminCredentials = {
    emailOrPhone: 'admin@gmail.com',
    password: 'admin123',
  };

  const userCredentials = {
    emailOrPhone: 'cobacoba110802@gmail.com',
    password: 'password123',
  };

  beforeAll(async () => {
    const adminResponse = await supertest(app)
        .post('/auth/admin/login')
        .send(adminCredentials);

    adminToken = adminResponse.body.data.accessToken;

    const userResponse = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

    userToken = userResponse.body.data.accessToken;
  });

  it('should get total users with admin authentication', async () => {
    const response = await supertest(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toHaveProperty('totalUsers');
  });

  it('should update user profile with valid data', async () => {
    const updatedProfile = {
      name: 'Fakhri Maulana',
      email: 'cobacoba110802@gmail.com',
      phone: '085155115555',
      city: "Bekasi",
      country: "Indonesia"
    };

    const response = await supertest(app)
        .put('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedProfile);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toHaveProperty('accessToken');
  });

  it('should change user password with valid data', async () => {
    const newPasswordData = {
      password: 'password123',
      newPassword: 'password123',
    };

    const response = await supertest(app)
        .put('/users/change-password')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newPasswordData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
