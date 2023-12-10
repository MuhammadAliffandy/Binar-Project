const OrderRepository = require('../repositories/orderRepository')
const CustomError = require("../../lib/customError");
const sendMail = require("../../lib/sendMail");

const createOrder = async (payload) => {
  const { userId, courseId, payment } = payload

  const foundDuplicateOrder = await OrderRepository.findByUserIdAndCourseId(userId, courseId)

  if (foundDuplicateOrder) throw new CustomError(409, "Order has already been placed")

  const createdOrder = await OrderRepository.create(userId, courseId, payment)

  await sendMail(
      createdOrder.user.email,
      `Order Confirmation for ${createdOrder.course.title} Course`,
      `Thank you for choosing CraftIQ ! We're excited to confirm your recent order for the ${createdOrder.course.title} Course.\n
Now you just have to wait for us to approve your order, we will send you an email as soon as possible.\n
Here is the order details :\n
Course Name : ${createdOrder.course.title}\n
Price : ${createdOrder.payment.amount}\n
Order at : ${createdOrder.createdAt}`
  )
}

const approveOrder = async (orderId) => {
  const updatedOrder = await OrderRepository.approveById(orderId)

 await sendMail(
      updatedOrder.user.email,
      `Order Approved for ${updatedOrder.course.title} Course`,
      `Great news ! We're thrilled to inform you that your recent order for the ${updatedOrder.course.title} Course has been approved and is now confirmed.\n
Here is the order details :\n
Course Name : ${updatedOrder.course.title}\n
Price : ${updatedOrder.payment.amount}\n
Order at : ${updatedOrder.createdAt}`
  )
}

const getAllOrder = async () => {
  return await OrderRepository.findAll()
}

const getAllUserOrder = async (userId) => {
  return await OrderRepository.findAllByUserId(userId)
}

const getAllFilteredOrder = async (payload) => {
  const filterOption = {};

  if (payload.category) {
    filterOption.course = {
      categoryId: payload.category
    }
  }

  if (payload.status) {
    filterOption.status = payload.status
  }

  const orderByOption = payload.date ? { createdAt: payload.date } : { createdAt: "asc" }

  const filteredOrders = await OrderRepository.findAllFiltered(filterOption, orderByOption)

  return filteredOrders
}

module.exports = {
  createOrder,
  approveOrder,
  getAllOrder,
  getAllUserOrder,
  getAllFilteredOrder
}