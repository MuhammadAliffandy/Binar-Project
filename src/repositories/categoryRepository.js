const prisma = require('../../lib/prisma')

const findAll = async () => {
  const categories = await prisma.category.findMany()

  return categories
}

module.exports = {
  findAll
}