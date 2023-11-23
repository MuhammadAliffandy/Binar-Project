const express = require('express');
const { createOrderHandler, approveOrderHandler, getAllUserOrderHandler, getAllOrderHandler } = require("../controllers/orderContoller");
const router = express.Router();

router
    .get('/', getAllOrderHandler)
    .post('/', createOrderHandler)
    .get('/id', getAllUserOrderHandler)
    .put('/approve', approveOrderHandler)

module.exports = router;