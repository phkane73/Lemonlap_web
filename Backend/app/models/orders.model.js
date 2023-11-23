const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersShema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalpriceOrder: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    dateOrder: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    statusOrder: {
        type: Number,
        default: 0,
    },
    ordersDetails: [{
        type: Schema.Types.ObjectId,
        ref: 'OrdersDetail'
    }],
})

const Orders = mongoose.model('Orders', ordersShema);
module.exports = Orders;