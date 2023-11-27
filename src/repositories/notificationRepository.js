const prisma = require("../../lib/prisma");
const create = async (payload) => {
  await prisma.notification.create({
    data: payload
  })
}

const findAllById = async (userId) => {
  const notifications = prisma.notification.findMany({
    where: {
      userId
    }
  })

  return notifications
}

module.exports = {
  create,
  findAllById
}