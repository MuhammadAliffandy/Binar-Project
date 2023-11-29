const errorHandler = require("../../lib/errorHandler");
const OrderService = require('../services/orderService')
const CustomResponse = require("../../lib/customResponse");

const createOrderHandler = async (req, res) => {
  const { id } = req.user
  const payload = req.body;

  try {
    await OrderService.createOrder({userId: id, ...payload})

    res.status(201).json(new CustomResponse("OK", "Order Created Successfully"))
  } catch (err) {
    errorHandler(res, err)
  }
}

const approveOrderHandler = async (req, res) => {
  const { orderId } = req.body

  try {
    await OrderService.approveOrder(orderId)

    return res.status(200).json(new CustomResponse("OK", "Order Approved Successfully"))
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
  const { id } = req.user

  try {
    const orders = await OrderService.getAllUserOrder(id)

    return res.status(200).json(new CustomResponse("OK", null, orders))
  } catch (err) {
    errorHandler(res, err)
  }
}

const getAllFilteredOrderHandler = async (req, res) => {
  const payload = req.body;

  try {
    const filteredOrders = await OrderService.getAllFilteredOrder(payload)

    return res.status(200).json(new CustomResponse("OK", null, filteredOrders))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  createOrderHandler,
  approveOrderHandler,
  getAllOrderHandler,
  getAllUserOrderHandler,
  getAllFilteredOrderHandler
}