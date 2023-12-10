const errorHandler = require("../../lib/errorHandler");
const NotificationService = require('../services/notificationService')
const CustomResponse = require("../../lib/customResponse");

const createNotificationHandler = async (req, res) => {
  const payload = req.body;
  const { id } = req.user

  try {
    await NotificationService.createNotification({ userId: id, ...payload })

    res.status(201).json(new CustomResponse("OK", "Notification Created Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const updateNotificationViewedHandler = async (req, res) => {
  const { notificationId } = req.body

  try {
    await NotificationService.updateNotificationViewed(notificationId)

    return res.status(200).json(new CustomResponse("OK", "Notification Viewed Updated Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const updateAllNotificationViewedHandler = async (req, res) => {
  const { id } = req.user;

  try {
    await NotificationService.updateAllNotificationViewed(id);

    return res.status(200).json(new CustomResponse("OK", "All Notification Viewed Updated Successfully"))
  } catch (err) {
    errorHandler(res, err)

  }
}

const getAllUserNotificationHandler = async (req, res) => {
  const { id } = req.user;

  try {
    const notifications = await NotificationService.getAllUserNotification(id)

    res.status(200).json(new CustomResponse("OK", null, notifications))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  createNotificationHandler,
  updateNotificationViewedHandler,
  updateAllNotificationViewedHandler,
  getAllUserNotificationHandler
}