const express = require("express");
const router = express.Router();
const ordersController = require('../controllers/orders.controller')

router.route('/add').post(ordersController.createOrder)
router.route('/getorderid').get(ordersController.getOrders)
router.route('/getallorders').get(ordersController.getAllOrders)
router.route('/getordersdeltails').get(ordersController.getOrdersDetail)
router.route('/confirmorders').get(ordersController.orderConfirmation)

module.exports = router