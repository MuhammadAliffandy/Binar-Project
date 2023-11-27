const NotificationRepository = require("../repositories/notificationRepository");
const createNotification = async (payload) => {
  await NotificationRepository.create(payload)
}

const getAllUserNotification = async (userId) => {
  const notifications = await NotificationRepository.findAllById(userId)

  return notifications
}

module.exports = {
  createNotification,
  getAllUserNotification
}