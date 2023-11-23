import API from "./API";

export default {
    listProducts(page, brand) {
        return API().get('/lemonlap/products/', { params: { page: page, brand: brand } });
    },
    getProduct(id) {
        return API().get('/lemonlap/products/' + id);
    }

}