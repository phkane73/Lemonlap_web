const moment = require('moment');
const Product = require("../models/product.model");
const ApiError = require("../api-error");
const Orders = require("../models/orders.model");
const OrdersDetail = require("../models/orderDetail.model");
const Cart = require("../models/cart.model");
exports.createOrder = async (req, res, next) => {
    const iduser = req.body.cart.user;
    const address = req.body.address;
    const products = req.body.cart.products;
    const totalPriceOrder = req.body.totalPriceOrder
    const dayOrder = moment().format('DD/MM/YYYY HH:mm:ss');
    const order = new Orders({
        user: iduser,
        address: address,
        totalpriceOrder: totalPriceOrder,
        dateOrder: dayOrder
    })
    await order.save();
    products.forEach(async product => {
        const orderDetail = new OrdersDetail({
            ordersId: order._id,
            productId: product.productId._id,
            quantityOrdersDetail: product.quantity,
            priceOrderDetails: product.totalprice,
            image: product.productId.avatar
        })
        order.ordersDetails.push(orderDetail);
        const productOne = await Product.findById(orderDetail.productId)
        productOne.number -= product.quantity
        productOne.save();
        orderDetail.save();
    });
    await order.save();
    await Cart.findOneAndDelete({ user: iduser })
    res.status(200).send('success')
};

exports.getOrders = async (req, res, next) => {
    const userId = req.query.userId;
    try {
        const orders = await Orders.find({ user: userId })
        res.status(200).send(orders);
    }
    catch (err) {
        return next(new ApiError(500, err))
    }

};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find().populate('user')
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, error))
    }
};
exports.getOrdersDetail = async (req, res, next) => {
    try {
        const orderId = req.query.orderId;
        const orderDetail = await OrdersDetail.find({ ordersId: orderId }).populate('productId');
        res.status(200).send(orderDetail);

    } catch (error) {
        return next(new ApiError(500, error))
    }
};
exports.orderConfirmation = async (req, res, next) => {
    try {
        const orderId = req.query.orderId;
        const orderConfirmation = await Orders.findOneAndUpdate({ _id: orderId }, { statusOrder: 1 }, {
            returnOriginal: false
        });
        res.status(200).send(orderConfirmation);

    } catch (error) {
        return next(new ApiError(500, error))
    }
}