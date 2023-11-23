const errorHandler = require("../../lib/errorHandler");
const OrderService = require('../services/orderService')
const CustomResponse = require("../../lib/customResponse");

const createOrderHandler = async (req, res) => {
  const payload = req.body;

  try {
    await OrderService.createOrder(payload)
  } catch (err) {
    errorHandler(res, err)
  }
}

const approveOrderHandler = async (req, res) => {
  const { orderId } = req.body

  try {
    const approvedOrder = await OrderService.approveOrder(orderId)

    return res.status(200).json(new CustomResponse("OK", "Order Approved Successfully", approvedOrder))
  } catch (err) {
    errorHandler(res, err)
  }
}

const getAllOrderHandler = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrder()

    return res.status(200).json(new CustomResponse("OK", null, orders))
  } catch (err) {
    errorHandler(res, err)
  }
}

const getAllUserOrderHandler = async (req, res) => {
  const { userId } = req.body

  try {
    const orders = await OrderService.getAllUserOrder(userId)

    return res.status(200).json(new CustomResponse("OK", null, orders))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  createOrderHandler,
  approveOrderHandler,
  getAllOrderHandler,
  getAllUserOrderHandler
}