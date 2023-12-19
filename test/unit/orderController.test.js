const ordersController = require('../../src/controllers/orderContoller');
const ordersService = require('../../src/services/orderService');
const CustomResponse = require('../../lib/customResponse');
const CustomError = require('../../lib/customError');

jest.mock('../../src/services/orderService');

describe('OrdersController', () => {
  describe('createOrderHandler', () => {
    const createOrderPayload = {
      courseId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
      payment: {
        cardNumber: "0123456789",
        cardName: "Windah Basudara",
        cvv: 1234,
        expiryDate: "2023-12-19T15:16:02.345Z",
        amount: 0
      }
    }

    it('should handle create order successfully', async () => {
      const req = { user: { id: 'fakeUserId' }, body: createOrderPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Order Created Successfully';
      ordersService.createOrder.mockResolvedValueOnce();

      await ordersController.createOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });

    it('should handle create order errors - Duplicate Order', async () => {
      const req = { user: { id: 'fakeUserId' }, body: createOrderPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Order has already been placed';
      ordersService.createOrder.mockRejectedValueOnce(new CustomError(409, errorMessage));

      await ordersController.createOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('approveOrderHandler', () => {
    it('should handle approve order successfully', async () => {
      const req = { body: { orderId: 'fakeOrderId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Order Approved Successfully';
      ordersService.approveOrder.mockResolvedValueOnce(successMessage);

      await ordersController.approveOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });
  });

  describe('getAllOrderHandler', () => {
    const fakeOrders = [
      {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        status: "WAITING",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        courseId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        paymentId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        user: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          name: "Windah Basudara",
          email: "example@gmail.com",
          phone: "08123456789",
          image: "https://example.com/image.png",
          country: "Indonesia",
          city: "Bekasi",
          role: "USER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        },
        course: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          title: "HTML",
          image: "https://example.com/image.png",
          subtitle: "English",
          description: "This is description",
          classCode: "XXX123",
          type: "PREMIUM",
          authorBy: "Windah Basudara",
          rating: 0,
          price: 0,
          level: "BEGINNER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          deletedAt: "2023-01-01T00:00:00.000Z",
          createdBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          updatedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          deletedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          categoryId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
        },
        payment: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          cardNumber: "0123456789",
          cardName: "Windah Basudara",
          cvv: 1234,
          expiryDate: "2023-12-19T15:19:31.421Z",
          amount: 0,
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        }
      }
    ]

    it('should handle get all orders successfully', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      ordersService.getAllOrder.mockResolvedValueOnce(fakeOrders);

      await ordersController.getAllOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, fakeOrders));
    });
  });

  describe('getAllUserOrderHandler', () => {
    const fakeUserOrders = [
      {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        status: "WAITING",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        courseId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        paymentId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        user: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          name: "Windah Basudara",
          email: "example@gmail.com",
          phone: "08123456789",
          image: "https://example.com/image.png",
          country: "Indonesia",
          city: "Bekasi",
          role: "USER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        },
        course: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          title: "HTML",
          image: "https://example.com/image.png",
          subtitle: "English",
          description: "This is description",
          classCode: "XXX123",
          type: "PREMIUM",
          authorBy: "Windah Basudara",
          rating: 0,
          price: 0,
          level: "BEGINNER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          deletedAt: "2023-01-01T00:00:00.000Z",
          createdBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          updatedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          deletedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          categoryId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
        },
        payment: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          cardNumber: "0123456789",
          cardName: "Windah Basudara",
          cvv: 1234,
          expiryDate: "2023-12-19T15:19:31.421Z",
          amount: 0,
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        }
      }
    ]

    it('should handle get all user orders successfully', async () => {
      const req = { user: { id: 'fakeUserId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      ordersService.getAllUserOrder.mockResolvedValueOnce(fakeUserOrders);

      await ordersController.getAllUserOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, fakeUserOrders));
    });
  });

  describe('getAllFilteredOrderHandler', () => {
    const fakeFilteredOrders = [
      {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        status: "WAITING",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        courseId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        paymentId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        user: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          name: "Windah Basudara",
          email: "example@gmail.com",
          phone: "08123456789",
          image: "https://example.com/image.png",
          country: "Indonesia",
          city: "Bekasi",
          role: "USER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        },
        course: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          title: "HTML",
          image: "https://example.com/image.png",
          subtitle: "English",
          description: "This is description",
          classCode: "XXX123",
          type: "PREMIUM",
          authorBy: "Windah Basudara",
          rating: 0,
          price: 0,
          level: "BEGINNER",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          deletedAt: "2023-01-01T00:00:00.000Z",
          createdBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          updatedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          deletedBy: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          categoryId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
        },
        payment: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
          cardNumber: "0123456789",
          cardName: "Windah Basudara",
          cvv: 1234,
          expiryDate: "2023-12-19T15:19:31.421Z",
          amount: 0,
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z"
        }
      }
    ]

    const filterPayload = {
      "categoryId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
      "status": "WAITING",
      "date": "asc"
    }

    it('should handle get all filtered orders successfully', async () => {
      const req = { body: filterPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      ordersService.getAllFilteredOrder.mockResolvedValueOnce(fakeFilteredOrders);

      await ordersController.getAllFilteredOrderHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, fakeFilteredOrders));
    });
  });
});