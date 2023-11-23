const mongoose = require('mongoose');
const Image = require("../models/image.model")
const { Schema } = mongoose;
const productShema = mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    cpu: {
        type: String,
        require: true
    },
    ram: {
        type: String,
        require: true
    },
    hardDrive: {
        type: String,
        require: true
    },
    screen: {
        type: String,
        require: true
    },
    screenCard: {
        type: String,
        require: true
    },
    port: {
        type: String,
        require: true
    },
    oS: {
        type: String,
        require: true
    },
    design: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    releaseDate: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
});

productShema.statics.findByName = async (name) => {
    const product = await Product.find({
        name: { $regex: new RegExp(name), $options: "i" },
    })
    return product;
}

const Product = mongoose.model('Product', productShema);
module.exports = Product;