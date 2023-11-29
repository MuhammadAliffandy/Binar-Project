const express = require('express');
const { createOrderHandler, approveOrderHandler, getAllUserOrderHandler, getAllOrderHandler,
  getAllFilteredOrderHandler
} = require("../controllers/orderContoller");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .get('/', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, getAllOrderHandler)
    .post('/', AuthMiddleware.verifyJWT, createOrderHandler)
    .get('/user', AuthMiddleware.verifyJWT, getAllUserOrderHandler)
    .post('/filter', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, getAllFilteredOrderHandler)
    .put('/approve', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, approveOrderHandler)

module.exports = router;