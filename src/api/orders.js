const express = require('express');
const { createOrderHandler, approveOrderHandler, getAllUserOrderHandler, getAllOrderHandler } = require("../controllers/orderContoller");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .get('/', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, getAllOrderHandler)
    .post('/', AuthMiddleware.verifyJWT, createOrderHandler)
    .get('/id', AuthMiddleware.verifyJWT, getAllUserOrderHandler)
    .put('/approve', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, approveOrderHandler)

module.exports = router;