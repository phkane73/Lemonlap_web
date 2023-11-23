const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartShema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        date: {
            type: Date,
            default: Date.now
        },
        quantity: Number,
        totalprice: Number
    }],
})

const Cart = mongoose.model('Cart', cartShema);
module.exports = Cart;