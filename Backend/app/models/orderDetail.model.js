const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersDetailShema = mongoose.Schema({
    ordersId: {
        type: Schema.Types.ObjectId,
        ref: 'Orders'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantityOrdersDetail: {
        type: Number,
        require: true
    },
    priceOrderDetails: {
        type: Number,
        require: true
    },
    image: {
        type: String,
    }
})

const OrdersDetail = mongoose.model('OrdersDetail', ordersDetailShema);
module.exports = OrdersDetail;