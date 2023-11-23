const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const ApiError = require("../api-error");
const Image = require("../models/image.model");
const path = require('path');
const root = require('app-root-path')
const fs = require('fs');
const config = require("../config");
exports.addProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const avatarFile = req.files.file;
        const avatar = req.files.file.name;
        product.avatar = avatar;
        const filepathAD = path.join(config.filepathadminpage + avatar)
        const filepathUS = path.join(config.filepathuserpage + avatar)
        avatarFile.mv(filepathAD)
        avatarFile.mv(filepathUS)
        const imageDetail = req.files.files;
        imageDetail.forEach((img) => {
            const image = new Image({
                imageName: img.name,
                product: product._id
            });
            image.save();
            product.images.push(image);
            const filepathAD = path.join(config.filepathadminpage + img.name)
            const filepathUS = path.join(config.filepathuserpage + img.name)
            img.mv(filepathAD)
            img.mv(filepathUS)
        })
        await product.save();
        res.status(200).send({ product, message: "Thêm sản phẩm thành công" })
    } catch (err) {
        return next(new ApiError(500, "Error:" + err));
    };
}
exports.findProductID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('images').exec();
        res.status(200).send(product);
    } catch (err) {
        return next(new ApiError(400, "Product not found"));
    }
}
exports.findAllProduct = async (req, res, next) => {
    try {
        const productOfPage = 12;
        const page = req.query.page;
        if (req.query.brand) {
            const brand = req.query.brand
            let products = await Product.find({ brand: brand }).populate('images')
                .limit(productOfPage * 1)
                .skip((page - 1) * productOfPage)
                .exec()
            const count = await Product.countDocuments({ brand: brand });
            const totalPages = Math.ceil(count / productOfPage);
            res.status(200).send({ products, totalPages: totalPages, currentPage: page });
        }
        let products = await Product.find().populate('images')
            .limit(productOfPage * 1)
            .skip((page - 1) * productOfPage)
            .exec()
        const count = await Product.countDocuments();
        const totalPages = Math.ceil(count / productOfPage);
        res.status(200).send({ products, totalPages: totalPages, currentPage: page });
    } catch (err) {
        return next(new ApiError(404, "Khong tim thay"));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        await Product.findOneAndUpdate(product._id, req.body);
        const imageUpdate = req.files;
        if (imageUpdate) {
            const avatar = req.files.file;
            const imageDetails = req.files.files;
            if (avatar) {
                product.avatar = avatar.name;
                const filepathAD = path.join(config.filepathadminpage + product.avatar)
                const filepathUS = path.join(config.filepathuserpage + product.avatar)
                fs.unlink(filepathAD, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                fs.unlink(filepathUS, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                const filepathADnew = path.join(config.filepathadminpage + avatar.name)
                const filepathUSnew = path.join(config.filepathuserpage + avatar.name)
                avatar.mv(filepathADnew)
                avatar.mv(filepathUSnew)
            }
            if (imageDetails) {
                const image = await Image.find({ product: product._id });
                await image.forEach((img) => {
                    const filepathAD = path.join(config.filepathadminpage + img.imageName)
                    const filepathUS = path.join(config.filepathuserpage + img.imageName)
                    fs.unlink(filepathAD, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    fs.unlink(filepathUS, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                })
                await Image.deleteMany({ product: product._id });
                await imageDetails.forEach((img) => {
                    const image = new Image({
                        imageName: img.name,
                        product: product._id
                    });
                    image.save();
                    product.images.push(image);
                    const filepathAD = path.join(config.filepathadminpage + img.name)
                    const filepathUS = path.join(config.filepathuserpage + img.name)
                    img.mv(filepathAD)
                    img.mv(filepathUS)
                })
            }
        }
        await product.save();
        const listcart = await Cart.find();
        listcart.forEach(async cart => {
            const itemIndex = cart.products.findIndex(p => p.productId == String(product._id));
            if (itemIndex >= 0) {
                cart.products[itemIndex].totalprice = cart.products[itemIndex].quantity * parseInt(req.body.price)
                await cart.save();
            }
        });
        res.status(200).send("Chỉnh sửa sản phẩm thành công");
    } catch (err) {
        return next(new ApiError(404, "Khong tim thay" + err));
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.id);
        product.isDeleted = true;
        product.save();
        res.status(200).send("Delete product successfully");
    }
    catch (err) {
        return next(new ApiError(404, "Khong tim thay" + err));
    }
}