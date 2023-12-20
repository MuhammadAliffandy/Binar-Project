const supertest = require('supertest');
const app = require('../../index');

describe('Order API Integration Tests', () => {
  let adminToken;
  let userToken;

  let courses;

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

    const createCourseResponse = await
        supertest(app)
            .post('/courses')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              title: "Introduction to Python Programming",
              image: "python_intro_image.jpg",
              subtitle: "Master the fundamentals of Python with hands-on examples.",
              description: "This comprehensive guide covers Python basics, data structures, and problem-solving techniques. Ideal for beginners and those looking to strengthen their programming skills.",
              classCode: "PY101",
              type: "FREE",
              authorBy: "John Doe",
              rating: 4.5,
              price: 2999999,
              level: "BEGINNER",
              telegram: 'www.tele.com',
              categoryId: "21020ab7-e3b0-45c6-a800-16494a92eb0d"
            })

    const coursesResponse = await supertest(app)
        .get('/courses')
        .set('Authorization', `Bearer ${userToken}`);

    courses = coursesResponse.body.data
  });

  it('should create a new order', async () => {
    const orderData = {
      courseId: courses[0].id,
      payment: {
        cardNumber: "0123456789",
        cardName: "Windah Basudara",
        cvv: 1234,
        expiryDate: "2023-12-19T15:16:02.345Z",
        amount: 2999999
      }
    }

    const response = await supertest(app)
        .post('/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(orderData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Order Created Successfully');
  });

  it('should approve an order', async () => {
    const res = await supertest(app)
        .get('/orders')
        .set('Authorization', `Bearer ${adminToken}`)

    const orderId = res.body.data[0].id;

    const response = await supertest(app)
        .put('/orders/approve')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ orderId });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Order Approved Successfully');
  });

  it('should get all orders', async () => {
    const response = await supertest(app)
        .get('/orders')
        .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toBeDefined();
  });

  it('should get all user orders', async () => {
    const response = await supertest(app)
        .get('/orders/user')
        .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toBeDefined();
  });

  it('should get all filtered orders', async () => {
    const filterData = {
      "status": "APPROVED",
      "date": "asc"
    }

    const response = await supertest(app)
        .post('/orders/filter')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(filterData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.data).toBeDefined();
  });
});
