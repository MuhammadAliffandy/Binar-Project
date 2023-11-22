const prisma = require('../../lib/prisma')

const create = async (payload) => {
  await prisma.user.create(
      {
        ...payload
      }
  )
}

module.exports = {
  create
}