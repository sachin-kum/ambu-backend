const express = require('express');
const { createOrder } = require('../../controller/order/order.controller');
const router = express.Router()


router.post('/order-now',createOrder )





module.exports = router