const NotificationRepository = require("../repositories/notificationRepository");
const createNotification = async (payload) => {
  await NotificationRepository.create(payload)
}

const updateNotificationViewed = async (notificationId) => {
  await NotificationRepository.updateViewedById(notificationId)
}

const updateAllNotificationViewed = async (userId) => {
  await NotificationRepository.updateAllViewedByUserId(userId)
}

const getAllUserNotification = async (userId) => {
  const notifications = await NotificationRepository.findAllById(userId)

  return notifications
}

module.exports = {
  createNotification,
  updateNotificationViewed,
  updateAllNotificationViewed,
  getAllUserNotification
}