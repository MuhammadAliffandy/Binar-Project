const errorHandler = require("../../lib/errorHandler");
const CustomResponse = require("../../lib/customResponse");
const CategoryService = require("../services/categoryService");

const getAllCategoryHandler = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategory()

    return res.status(200).json(new CustomResponse("OK", null, categories))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  getAllCategoryHandler
}