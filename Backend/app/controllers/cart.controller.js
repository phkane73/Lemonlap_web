const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const ApiError = require("../api-error");
const mongoose = require('mongoose');
exports.createCart = async (req, res, next) => {
    const iduser = req.body.id;
    const { productId, quantity, totalprice } = req.body.product;
    new mongoose.Types.ObjectId(iduser)
    new mongoose.Types.ObjectId(productId)
    try {
        let cart = await Cart.findOne({ user: iduser });
        if (cart) {
            let itemIndex = cart.products.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity = productItem.quantity + quantity;
                productItem.totalprice = productItem.totalprice + totalprice;
                cart.products[itemIndex] = productItem;
            }
            else {
                cart.products.push({ productId, quantity, totalprice });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
            const newCart = await Cart.create({
                user: iduser,
                products: [{ productId, quantity, totalprice }]
            });
            const user = await User.findById(iduser)
            user.cart = newCart;
            user.save();
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        return next(new ApiError(500, err));
    }
};

exports.getAllCart = async (req, res, next) => {
    const iduser = req.query.id;
    try {
        const cart = await Cart.findOne({ user: iduser }).populate('products.productId');
        res.status(200).send(cart);
    } catch (err) {
        return next(new ApiError(500, err))
    }
};

exports.increase = async (req, res, next) => {
    const iduser = req.query.userId;
    const idproduct = req.query.productId;
    new mongoose.Types.ObjectId(iduser)
    try {
        const cart = await Cart.findOne({ user: iduser });
        const product = await Product.findOne({ _id: idproduct });
        let itemIndex = cart.products.findIndex(p => p.productId == idproduct);
        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            if (productItem.quantity < product.number) {
                productItem.quantity = productItem.quantity + 1;
                productItem.totalprice = productItem.totalprice + product.price;
                cart.products[itemIndex] = productItem;
            }
        }
        await cart.save();
        return res.status(200).send(cart)
    } catch (error) {
        return next(new ApiError(500, error))
    }
};
exports.decrease = async (req, res, next) => {
    const iduser = req.query.userId;
    const idproduct = req.query.productId;
    new mongoose.Types.ObjectId(iduser)
    try {
        const cart = await Cart.findOne({ user: iduser });
        const product = await Product.findOne({ _id: idproduct });
        let itemIndex = cart.products.findIndex(p => p.productId == idproduct);
        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            if (productItem.quantity > 1) {
                productItem.quantity = productItem.quantity - 1;
                productItem.totalprice = productItem.totalprice - product.price;
                cart.products[itemIndex] = productItem;
            }
        }
        await cart.save();
        return res.status(200).send(cart)
    } catch (error) {
        return next(new ApiError(500, error))
    }
};

exports.deleteCartItem = async (req, res, next) => {
    try {
        const iduser = req.query.userId;
        const idproduct = req.query.productId;
        const cart = await Cart.findOne({ user: iduser });
        let itemIndex = cart.products.findIndex(p => p.productId == idproduct);
        let result = [];
        cart.products.forEach((value, index) => {
            if (index !== itemIndex) {
                result.push(value);
            }
        });
        cart.products = result;
        await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        return next(new ApiError(500, err))
    }
};