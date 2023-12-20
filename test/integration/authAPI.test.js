const supertest = require('supertest');
const app = require('../../index');

describe('Auth API Integration Tests', () => {
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
    const userResponse = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

    userToken = userResponse.body.data.accessToken;
  });

  it('should register a new user and send OTP', async () => {
    const newUser = {
      name: 'Fakhri Maulana',
      email: 'fkhrmhsn110802@gmail.com',
      phone: '085155115155',
    };

    const response = await supertest(app)
        .post('/auth/register')
        .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toContain('OTP Number has been sent');
  });

  it('should resend OTP to a registered user', async () => {
    const existingUser = {
      email: 'fkhrmhsn110802@gmail.com',
    };

    const response = await supertest(app)
        .put('/auth/register/resend-otp')
        .send(existingUser);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toContain('OTP Number has been sent');
  });

  it('should log in as a user', async () => {
    const response = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toHaveProperty('accessToken');
  });

  it('should log in as a admin', async () => {
    const response = await supertest(app)
        .post('/auth/admin/login')
        .send(adminCredentials);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toHaveProperty('accessToken');
  });

  it('should get current user information', async () => {
    const response = await supertest(app)
        .get('/auth/current-user')
        .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('email');
  });

  it('should log out a user', async () => {
    const response = await supertest(app)
        .get('/auth/logout')
        .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Logout Successfully');
  });

  it('should reset password for a user', async () => {
    const resetPasswordData = {
      email: 'cobacoba110802@gmail.com',
    };

    const response = await supertest(app)
        .put('/auth/reset-password')
        .send(resetPasswordData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toContain('Reset Password Link has been sent');
  });
});
