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

const updateViewedById = async (notificationId) => {
  await prisma.notification.update({
    where: {
      id: notificationId
    },
    data: {
      isViewed: true
    }
  })
}

const updateAllViewedByUserId = async (userId) => {
  await prisma.notification.updateMany({
    where: {
      userId,
      isViewed: false,
    },
    data: {
      isViewed: true
    }
  })
}

module.exports = {
  create,
  findAllById,
  updateViewedById,
  updateAllViewedByUserId
}