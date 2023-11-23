<template>
    <Header></Header>
    <div class="col-md-2 p-0">
        <Navbar></Navbar>
    </div>
    <div class="col-md-10 p-2">
        <h2 class="text-center font-weight-bold">Danh sách sản phẩm</h2>
        <router-link to="/addproduct" class="btn btn-success"> Thêm sản phẩm</router-link>
        <table class="table table-striped mt-3">
            <thead style="background-color: black;">
                <tr class="text-center">
                    <th class="title" scope="col">STT</th>
                    <th class="title" scope="col">Tên sản phẩm</th>
                    <th class="title" scope="col">Giá</th>
                    <th class="title" scope="col">Hãng</th>
                    <th class="title" scope="col">Số lượng kho</th>
                    <th class="title" scope="col">Ảnh đại diện</th>
                    <th class="title" scope="col">Chỉnh sửa/Xóa</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product, index in products" :key="product._id">
                    <th class="product" scope="row">{{ index + 1 }}</th>
                    <th class="product" scope="col">{{ product.productName }}</th>
                    <th class="product" scope="col">{{ new Intl.NumberFormat()
                        .format(product.price)
                        .replaceAll(",", ".") }}đ</th>
                    <th class="product" scope="col">{{ product.brand }}</th>
                    <th class="product" scope="col">{{ product.number }}</th>
                    <th class="product" scope="col">
                        <img v-bind:src="'/image/' + product.avatar" alt=""
                            style="width:100px; height: 100px; object-fit: scale-down;">
                    </th>
                    <th class="product" scope="col" v-if="product.isDeleted == false">
                        <router-link class="btn btn-primary" v-bind:to="'/updateproduct/' + product._id">
                            Sửa
                        </router-link>
                        <button type="button" class="btn btn-danger ml-4" data-toggle="modal"
                            :data-target="'#' + product._id">
                            Xóa
                        </button>
                        <div class="modal fade" :id="product._id" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Xóa sản phẩm</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <span style="height: 60px; margin: 0; line-height: 60px;">Bạn có chắc muốn xóa sản phẩm
                                        này!</span>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal"
                                            @click="deleteProduct(product._id)">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th>
                    <th class="product text-uppercase text-danger" v-else>Ngưng bán</th>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation" v-if="totalPages > 1" style="display: flex; justify-content:center ;">
            <ul class="pagination">
                <li class="page-item" v-if="this.page > 1"><a class="page-link" href="#"
                        @click="currentPage(parseInt(this.page) - 1)">
                        <i class="fa-solid fa-angles-left"></i>
                    </a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click="currentPage(1)">First</a>
                </li>
                <li class="page-item" v-for="number in totalPages">
                    <a class="page-link" :id="number" @click="currentPage(number)">{{ number }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click="currentPage(totalPages)">Last</a>
                </li>
                <li class="page-item" v-if="this.page < totalPages">
                    <a class="page-link" href="#" @click="currentPage(parseInt(this.page) + 1)">
                        <i class="fa-solid fa-angles-right">
                        </i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.product {
    line-height: 100px;
    text-align: center;
}

.title {
    color: #F2ED4E;
}

.active {
    color: #F2ED4E !important;
    background-color: black;
}

.page-link {
    color: black;
}
</style>

<script>
import ProductAPI from "../services/productAPI"
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
export default {
    components: {
        Header,
        Navbar
    },
    name: "ListProductsView",
    data() {
        return {
            products: [],
            totalPages: 0,
            page: 1
        }
    },
    methods: {
        async listProducts() {
            await ProductAPI.listProducts(this.page).then((res) => {
                this.products = res.data.products;
                this.page = res.data.currentPage;
                this.totalPages = res.data.totalPages;
            }).catch((err) => {
                console.log(err);
            })
        },
        async currentPage(page) {
            document.getElementById(this.page).classList.remove("active");
            this.page = page;
            this.listProducts();
            const active = document.getElementById(page)
            active.classList.add("active");
        },
        async deleteProduct(id) {
            await ProductAPI.deleteProduct(id).then((res) => {
                this.listProducts();
            }).catch((err) => {
            })
        },
        auth() {
            if (sessionStorage.getItem("id") == null) {
                this.$router.push("/")
            }
        },
        scroll() {
            window.scroll({
                top: 0
            })
        },
    },
    created() {
        this.listProducts()
        this.scroll()
    }
}
</script>