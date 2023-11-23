import API from "./API";

export default {
    getAllOrders() {
        return API().get('/lemonlap/orders/getallorders')
    },
    getOrdersDetails(id) {
        return API().get('/lemonlap/orders/getordersdeltails', { params: { orderId: id } });
    },
    confirmOrders(id) {
        return API().get('/lemonlap/orders/confirmorders', { params: { orderId: id } });
    }
}