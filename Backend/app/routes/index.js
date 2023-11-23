const userRouter = require("../routes/user.route");
const productRouter = require("../routes/product.route");
const cartRouter = require("../routes/cart.route");
const orderRouter = require("../routes/orders.route");

function route(app) {
    app.use('/lemonlap/users', userRouter);
    app.use('/lemonlap/products', productRouter);
    app.use('/lemonlap/carts', cartRouter)
    app.use('/lemonlap/orders', orderRouter);
}

module.exports = route;