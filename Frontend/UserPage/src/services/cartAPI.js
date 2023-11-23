import API from "./API";

export default {
    addToCart(id, product) {
        return API().post('/lemonlap/carts/add', { id: id, product: product });
    },
    getAllCarts(id) {
        return API().get('/lemonlap/carts/getallcarts', { params: { id: id } });
    },
    increase(id, product) {
        return API().get('/lemonlap/carts/increase', { params: { userId: id, productId: product } });
    },
    decrease(id, product) {
        return API().get('/lemonlap/carts/decrease', { params: { userId: id, productId: product } });
    },
    delete(id, product) {
        return API().delete('/lemonlap/carts/delete', { params: { userId: id, productId: product } });
    }
}