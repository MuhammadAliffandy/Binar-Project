const userController = require('../../src/controllers/usersController');
const userService = require('../../src/services/usersService');
const CustomResponse = require('../../lib/customResponse');
const CustomError = require('../../lib/customError');

jest.mock('../../src/services/usersService'); // Mocking the UserService module

describe('UserController', () => {
  describe('changePasswordHandler', () => {
    it('should handle change password successfully', async () => {
      const req = { user: { id: 'fakeUserId' }, body: { password: 'oldPassword', newPassword: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Change Password Successfully';
      userService.changePassword.mockResolvedValueOnce();

      await userController.changePasswordHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });

    it('should handle change password errors - Wrong Password', async () => {
      const req = { user: { id: 'fakeUserId' }, body: { password: 'wrongPassword', newPassword: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Wrong Password';
      userService.changePassword.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await userController.changePasswordHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('updateProfileHandler', () => {
    // it('should handle update profile successfully', async () => {
    //   const updateProfilePayload = {
    //     name: "Windah Basudara",
    //     email: "example@gmail.com",
    //     phone: "08123456789",
    //     city: "Bekasi",
    //     country: "Indonesia"
    //   }
    //
    //   const req = { user: { id: 'fakeUserId' }, body: updateProfilePayload };
    //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //
    //   const accessToken = 'fakeAccessToken';
    //   userService.updateProfile.mockResolvedValueOnce(accessToken);
    //
    //   await userController.updateProfileHandler(req, res);
    //
    //   expect(res.status).toHaveBeenCalledWith(200);
    //   expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, { accessToken }));
    // });

    it('should handle update profile errors - Empty Field', async () => {
      const updateProfilePayload = {
        name: "Windah Basudara",
        phone: "08123456789",
        country: "Indonesia",
        city: "Bekasi"
      }

      const req = { user: { id: 'fakeUserId' }, body: updateProfilePayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Field email can\'t be empty';
      userService.updateProfile.mockRejectedValueOnce(new CustomError(400, errorMessage));

      await userController.updateProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle update profile errors - Email Already Used', async () => {
      const req = { user: { id: 'fakeUserId' }, body: { email: 'example@gmail.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Email Already Used';
      userService.updateProfile.mockRejectedValueOnce(new CustomError(409, errorMessage));

      await userController.updateProfileHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('getTotalUsersHandler', () => {
    it('should handle get total users successfully', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const totalUsers = 10;
      userService.getTotalUsers.mockResolvedValueOnce(totalUsers);

      await userController.getTotalUsersHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, { totalUsers }));
    });
  });

  // ... (other test blocks for other functions)
});