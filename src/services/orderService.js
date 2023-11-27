const OrderRepository = require('../repositories/orderRepository')
const CustomError = require("../../lib/customError");

const createOrder = async (payload) => {
  const {userId, courseId, payment} = payload

  const foundDuplicateOrder = await OrderRepository.findByUserIdAndCourseId(userId, courseId)

  if (foundDuplicateOrder) throw new CustomError(409, "Order has already been placed")

  await OrderRepository.create(userId, courseId, payment)
}

const approveOrder = async (orderId) => {
  await OrderRepository.approveById(orderId)
}

const getAllOrder = async () => {
  return await OrderRepository.findAll()
}

const getAllUserOrder = async (userId) => {
  return await OrderRepository.findAllByUserId(userId)
}

module.exports = {
  createOrder,
  approveOrder,
  getAllOrder,
  getAllUserOrder
}