<template>
    <main>
        <div class="container">
            <div class="row my-4" style="height: 40px">
                <RouterLink class="linkGr" to="/" style="line-height: 40px">Trang chủ</RouterLink>
                <i class="fa-solid fa-chevron-right" style="line-height: 40px; margin-left: 3px; margin-right: 3px"></i>
                <span class="linkGr" @click="listProducts(brand)" style="line-height: 40px; cursor: pointer;">Sản
                    phẩm</span>
            </div>
            <h1 class="category-name text-uppercase text-center my-5">
                Các Sản phẩm laptop
            </h1>
            <div class="row mb-5">
                <ul class="laptop-brand d-flex justify-content-between w-100">
                    <li class="laptop-brand__item">
                        <div @click="listProducts('Apple');" style="cursor: pointer">
                            <img src="../assets/macbook-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('Asus')" style="cursor: pointer">
                            <img src="../assets/asus-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('Dell')" style="cursor: pointer">
                            <img src="../assets/dell-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('HP')" style="cursor: pointer">
                            <img src="../assets/hp-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('Acer')" style="cursor: pointer">
                            <img src="../assets/acer-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('Lenovo')" style="cursor: pointer">
                            <img src="../assets/lenovo-img.png" />
                        </div>
                    </li>
                    <li class="laptop-brand__item">
                        <div @click="listProducts('MSI')" style="cursor: pointer">
                            <img src="../assets/logo-msi.png" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="row my-5">
                <div class="col-md-3 mt-4" v-for="product in products" v-bind:key="product._id">
                    <RouterLink :to="'/products/' + product._id">
                        <div class="card" style="width: 100%; border-radius: 10px">
                            <img v-bind:src="'image/' + product.avatar
                                " class="card-img-top p-3" style="
                    width: 100%;
                    height: 200px;
                    object-fit: scale-down;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                  " />
                            <div class="card-body">
                                <p>{{ product.productName }}</p>
                                <p>
                                    {{
                                        new Intl.NumberFormat()
                                            .format(product.price)
                                            .replaceAll(",", ".")
                                    }}đ
                                </p>
                                <p>Hãng: {{ product.brand }}</p>
                                <p v-if="product.number != 0 && product.isDeleted == false">Số lượng còn trong kho: {{
                                    product.number }}</p>
                                <p v-else-if="product.isDeleted" style="color: red;">Sản phẩm ngưng bán</p>
                                <p v-else style="color: red;">Hết hàng</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
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
    </main>
</template>
  
<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card p {
    font-size: 14px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.category {
    display: inline-block;
}

.card-body {
    padding: 0 20px 20px 20px;
}

.product {
    line-height: 100px;
    text-align: center;
}

.title {
    color: #F2ED4E;
}

.active {
    color: #F2ED4E !important;
    background-color: black !important;
}

.page-link {
    color: black;
}

.laptop-brand__item img {
    border: 1px solid black;
    border-radius: 8px;
}
</style>
  
<script>
import productServices from "../services/productAPI";
import productDetail from "../components/productDetail.vue"
export default {
    components: {
        productDetail
    },
    name: "Product",
    data() {
        return {
            products: [],
            page: 1,
            totalPages: 0,
            brand: ""
        };
    },
    methods: {
        async listProducts(brand) {
            await productServices.listProducts(this.page, brand).then((res) => {
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
            this.listProducts(this.brand);
            const active = document.getElementById(page)
            active.classList.add("active");
        },
        scroll() {
            window.scroll({
                top: 0
            })
        },
    },
    created() {
        this.scroll();
        this.listProducts(this.brand);
    },
};
</script>
  