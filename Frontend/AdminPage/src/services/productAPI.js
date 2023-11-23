import API from "./API";

export default {
    listProducts(page) {
        return API().get('/lemonlap/products/', { params: { page: page } });
    },
    addProduct(product) {
        return API().post('/lemonlap/products/add', product)
    },
    deleteProduct(id) {
        return API().delete('/lemonlap/products/delete', { params: { id: id } })
    },
    getProduct(id) {
        return API().get('/lemonlap/products/' + id)
    },
    updateProduct(id, product) {
        return API().put('/lemonlap/products/update/' + id, product)
    }
}