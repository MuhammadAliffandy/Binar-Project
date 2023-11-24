const CategoryRepository = require("../repositories/categoryRepository");
const getAllCategory = async () => {
  const categories = await CategoryRepository.findAll();

  return categories
}

module.exports = {
  getAllCategory
}