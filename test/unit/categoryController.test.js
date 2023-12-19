const categoryController = require('../../src/controllers/categoryController');
const categoryService = require('../../src/services/categoryService');
const CustomResponse = require('../../lib/customResponse');
const CustomError = require('../../lib/customError');

jest.mock('../../src/services/categoryService'); // Mocking the CategoryService module

describe('CategoryController', () => {
  describe('getAllCategoryHandler', () => {
    const fakeCategories = [
      {
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        "title": "Web Development",
        "image": "https://example.com/image.png"
      }
    ]

    it('should get all categories successfully', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      categoryService.getAllCategory.mockResolvedValueOnce(fakeCategories);

      await categoryController.getAllCategoryHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(new CustomResponse('OK', null, fakeCategories));
    });
  });
});
