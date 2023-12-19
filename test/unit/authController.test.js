const authController = require('../../src/controllers/authController');
const AuthService = require('../../src/services/authService');
const CustomResponse = require('../../lib/customResponse');
const CustomError = require('../../lib/customError');
const errorHandler = require('../../lib/errorHandler');

jest.mock('../../src/services/authService'); // Mocking the AuthService module

describe('AuthController', () => {
  describe('registerHandler', () => {
    const registerPayload = {
      name: "Windah Basudara",
      email: "example@gmail.com",
      phone: "08123456789",
      password: "password123"
    }

    it('should handle registration successfully', async () => {
      const req = { body: registerPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      AuthService.register.mockResolvedValueOnce();

      await authController.registerHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', `OTP Number has been sent to ${registerPayload.email}`));
    });

    it('should handle registration errors', async () => {
      const req = { body: registerPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Email Already Used';
      AuthService.register.mockRejectedValueOnce(new CustomError(409, errorMessage));

      await authController.registerHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('registerWithOTPHandler', () => {
    const registerOTPPayload = {
      name: "Windah Basudara",
      email: "example@gmail.com",
      phone: "08123456789",
      password: "password123",
      payload: "123456"
    }

    it('should handle registration with OTP successfully', async () => {
      const req = { body: registerOTPPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      AuthService.registerWithOTP.mockResolvedValueOnce();

      await authController.registerWithOTPHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', 'Register Successfully'));
    });

    it('should handle registration with OTP errors - Invalid OTP', async () => {
      const req = { body: registerOTPPayload };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Invalid OTP';
      AuthService.registerWithOTP.mockRejectedValueOnce(new CustomError(400, errorMessage));

      await authController.registerWithOTPHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle registration with OTP errors - OTP Expired', async () => {
      const req = { body: registerOTPPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'OTP Expired';
      AuthService.registerWithOTP.mockRejectedValueOnce(new CustomError(410, errorMessage));

      await authController.registerWithOTPHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(410);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('loginHandler', () => {
    const loginPayload = {
      emailOrPhone: "example@gmail.com",
      password: "password123"
    }

    it('should handle login successfully', async () => {
      const req = { body: loginPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), cookie: jest.fn() };

      const accessToken = 'fakeAccessToken';
      AuthService.login.mockResolvedValueOnce(accessToken);

      await authController.loginHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', 'Login Successfully', { accessToken }));
      expect(res.cookie).toHaveBeenCalledWith('jwt', accessToken, { httpOnly: true, maxAge: 604800000 });
    });

    it('should handle login errors - Email or Phone not Registered', async () => {
      const req = { body: loginPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Email or Phone not Registered';
      AuthService.login.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await authController.loginHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle login errors - Wrong Password', async () => {
      const req = { body: loginPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Wrong Password';
      AuthService.login.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await authController.loginHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('loginAdminHandler', () => {
    const loginAdminPayload = {
      emailOrPhone: "admin@gmail.com",
      password: "admin123"
    }

    it('should handle admin login successfully', async () => {
      const req = { body: loginAdminPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), cookie: jest.fn() };

      const accessToken = 'fakeAccessToken';
      AuthService.loginAdmin.mockResolvedValueOnce(accessToken);

      await authController.loginAdminHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', 'Login Successfully', { accessToken }));
      expect(res.cookie).toHaveBeenCalledWith('jwt', accessToken, { httpOnly: true, maxAge: 604800000 });
    });

    it('should handle admin login errors - Email or Phone not Registered', async () => {
      const req = { body: loginAdminPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Email or Phone not Registered';
      AuthService.login.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await authController.loginHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle admin login errors - Wrong Password', async () => {
      const req = { body: loginAdminPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Wrong Password';
      AuthService.login.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await authController.loginHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle admin login errors - Only Admin can access this resource', async () => {
      const req = { body: loginAdminPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Only Admin can access this resource';
      AuthService.loginAdmin.mockRejectedValueOnce(new CustomError(403, errorMessage));

      await authController.loginAdminHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('currentUserHandler', () => {
    const currentUserPayload = {
      id: "aa00b8b1-26b3-4a9e-b6ef-96688f6c2f04",
      name: "Windah Basudara",
      email: "example@gmail.com",
      phone: "08123456789",
      image: null,
      country: null,
      city: null,
      role: "USER",
      iat: 12345,
      exp: 12345
    }
    it('should handle current user retrieval successfully', () => {
      const req = { user: currentUserPayload };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const filteredUser = {
        id: "aa00b8b1-26b3-4a9e-b6ef-96688f6c2f04",
        name: "Windah Basudara",
        email: "example@gmail.com",
        phone: "08123456789",
        image: null,
        country: null,
        city: null,
        role: "USER"
      };

      AuthService.filterUserData.mockReturnValueOnce(filteredUser);

      authController.currentUserHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, filteredUser));
    });
  });

  describe('logoutHandler', () => {
    it('should handle logout successfully', () => {
      const req = { cookies: { jwt: 'fakeToken' } };
      const res = { clearCookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

      authController.logoutHandler(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt', { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', 'Logout Successfully'));
    });
  });

  describe('resetPasswordHandler', () => {
    it('should handle reset password request successfully', async () => {
      const req = { body: { email: 'example@gmail.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = `Reset Password Link has been sent to ${req.body.email}`;
      AuthService.resetPassword.mockResolvedValueOnce();

      await authController.resetPasswordHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });

    it('should handle reset password errors - Email not Registered', async () => {
      const req = { body: { email: 'nonexistent@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Email not Registered';
      AuthService.resetPassword.mockRejectedValueOnce(new CustomError(401, errorMessage));

      await authController.resetPasswordHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle reset password errors - reset link already sent', async () => {
      const req = { body: { email: 'existing@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Reset Password Link has been sent';
      AuthService.resetPassword.mockRejectedValueOnce(new CustomError(409, errorMessage));

      await authController.resetPasswordHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  describe('resetPasswordUserHandler', () => {
    it('should handle reset user password successfully', async () => {
      const req = { params: { resetToken: 'fakeResetToken' }, body: { password: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const successMessage = 'Reset Password Successfully';
      AuthService.resetPasswordUser.mockResolvedValueOnce();

      await authController.resetPasswordUserHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', successMessage));
    });

    it('should handle reset user password errors - invalid reset token', async () => {
      const req = { params: { resetToken: 'invalidToken' }, body: { password: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Invalid Reset Token';
      AuthService.resetPasswordUser.mockRejectedValueOnce(new CustomError(403, errorMessage));

      await authController.resetPasswordUserHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle reset user password errors - reset token expired', async () => {
      const req = { params: { resetToken: 'expiredToken' }, body: { password: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Reset Token Expired';
      AuthService.resetPasswordUser.mockRejectedValueOnce(new CustomError(410, errorMessage));

      await authController.resetPasswordUserHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(410);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });

    it('should handle reset user password errors - generic error', async () => {
      const req = { params: { resetToken: 'fakeResetToken' }, body: { password: 'newPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Reset user password failed';
      AuthService.resetPasswordUser.mockRejectedValueOnce(new Error(errorMessage));

      await authController.resetPasswordUserHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('FAIL', errorMessage));
    });
  });

  // Add similar test blocks for other controller functions
});