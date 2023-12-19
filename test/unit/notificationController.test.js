const notificationController = require('../../src/controllers/notificationController');
const notificationService = require('../../src/services/notificationService');
const CustomResponse = require('../../lib/customResponse');
const CustomError = require('../../lib/customError');

jest.mock('../../src/services/notificationService'); // Mocking the NotificationService module

describe('NotificationController', () => {
  describe('createNotificationHandler', () => {
    const createNotificationPayload = {
      title: "Discount",
      subtitle: "50% All Course",
      description: "Terms and Conditions Apply"
    }

    it('should create a notification successfully', async () => {
      const req = { user: { id: 'fakeUserId' }, body: createNotificationPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Notification Created Successfully';
      notificationService.createNotification.mockResolvedValueOnce();

      await notificationController.createNotificationHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });
  });

  describe('updateNotificationViewedHandler', () => {
    it('should update notification viewed successfully', async () => {
      const req = { body: { notificationId: 'fakeNotificationId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Notification Viewed Updated Successfully';
      notificationService.updateNotificationViewed.mockResolvedValueOnce();

      await notificationController.updateNotificationViewedHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });
  });

  describe('updateAllNotificationViewedHandler', () => {
    it('should update all notifications viewed successfully', async () => {
      const req = { user: { id: 'fakeUserId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'All Notification Viewed Updated Successfully';
      notificationService.updateAllNotificationViewed.mockResolvedValueOnce();

      await notificationController.updateAllNotificationViewedHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });
  });

  describe('getAllUserNotificationHandler', () => {
    it('should get all user notifications successfully', async () => {
      const fakeNotifications = [
        [
          {
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
            title: "Discount",
            subtitle: "50% All Course",
            description: "Terms and Conditions Apply",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
          },
          {
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
            title: "Discount",
            subtitle: "50% All Course",
            description: "Terms and Conditions Apply",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
          }
        ]
      ]

      const req = { user: { id: 'fakeUserId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      notificationService.getAllUserNotification.mockResolvedValueOnce(fakeNotifications);

      await notificationController.getAllUserNotificationHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, fakeNotifications));
    });
  });
});
