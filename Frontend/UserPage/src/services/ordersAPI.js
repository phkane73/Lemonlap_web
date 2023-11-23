import API from "./API";

export default {
    createOrder(cart, address, totalPriceOrder) {
        return API().post('/lemonlap/orders/add', { cart: cart, address: address, totalPriceOrder: totalPriceOrder })
    },
    getOrder(id) {
        return API().get('/lemonlap/orders/getorderid', { params: { userId: id } });
    },
    getOrdersDetails(id) {
        return API().get('/lemonlap/orders/getordersdeltails', { params: { orderId: id } });
    }
}