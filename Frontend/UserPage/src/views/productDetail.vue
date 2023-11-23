<template>
    <div class="container">
        <div class="row my-2" style="height: 40px;">
            <RouterLink class="linkGr" to="/" style="line-height: 40px">Trang chủ</RouterLink>
            <i class="fa-solid fa-chevron-right" style="line-height: 40px; margin-left: 3px; margin-right: 3px"></i>
            <RouterLink class="linkGr" to="/products" style="line-height: 40px">Sản phẩm</RouterLink>
        </div>
        <div class="row">
            <h3 class="w-100">{{ product.productName }}</h3>
            <div class="col-md-8 p-0">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" v-bind:data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" v-bind:data-slide-to="n"
                            v-for="n in product.images.length - 1" v-bind:key="n" class=""></li>
                    </ol>
                    <div class="carousel-inner" style="border: 2px solid white; border-radius: 5px">
                        <div class="carousel-item active">
                            <img class="d-block w-100" v-bind:src="'/image/' +
                                product.images[0].imageName
                                " style="height: 430px; border-radius: 5px" />
                        </div>
                        <div class="carousel-item" v-for="n in product.images.length - 1" v-bind:key="n">
                            <img class="d-block w-100" v-bind:src="'/image/' +
                                product.images[n].imageName
                                " style="height: 430px; border-radius: 5px" />
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <img src="../assets/product-detail-img-best-price.png" style="height: 113px; margin: 0 30px" />
                <h2 style="
            color: red;
            font-weight: 700;
            position: relative;
            margin-bottom: 20px;
            margin-left: 82px;
          ">
                    {{
                        new Intl.NumberFormat().format(product.price).replaceAll(",", ".")
                    }}
                    <i class="fa-solid fa-dong-sign" style="font-size: 20px; position: absolute; top: 3px"></i>
                </h2>
                <h6>Bảo hành chính hãng {{ product.categoryName }} 1 năm</h6>
                <h6>Hãng sản xuất: {{ product.brand }}</h6>
                <h6 style="margin-bottom: 33px;">Số lượng trong kho: {{ product.number }}</h6>
                <a href="#configure" class="btn btn-primary my-3 w-100"
                    style="padding: 12px; text-transform: uppercase;">Chi tiết
                    cấu hình sản phẩm</a>
                <div class="btn btn-danger d-block disabled" v-if="product.isDeleted"
                    style="padding: 12px; font-weight: bold; text-transform: uppercase; margin-top: 20px;">
                    Sản phẩm ngưng bán
                </div>
                <div class="btn btn-danger d-block" v-if="product.number != 0 && product.isDeleted == false"
                    style="padding: 12px; font-weight: bold; text-transform: uppercase; margin-top: 20px;"
                    @click="addToCart()">
                    Thêm sản phẩm vào giỏ hàng
                </div>
                <div class="btn btn-danger d-block disabled" v-if="product.number == 0"
                    style="padding: 12px; font-weight: bold; text-transform: uppercase; margin-top: 20px;">
                    Sản phẩm hết hàng
                </div>
            </div>
        </div>
        <div class="row my-5" id="configure">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <h2 class="text-center">Cấu hình chi tiết của</h2>
                <h3>{{ product.productName }}</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CPU:</td>
                            <td>{{ product.cpu }}</td>
                        </tr>
                        <tr>
                            <td>RAM:</td>
                            <td>{{ product.ram }}</td>
                        </tr>
                        <tr>
                            <td>Ổ cứng:</td>
                            <td>{{ product.hardDrive }}</td>
                        </tr>
                        <tr>
                            <td>Màn hình:</td>
                            <td>{{ product.screen }}</td>
                        </tr>
                        <tr>
                            <td>Card màn hình:</td>
                            <td>{{ product.screenCard }}</td>
                        </tr>
                        <tr>
                            <td>Cổng kết nối:</td>
                            <td>{{ product.port }}</td>
                        </tr>
                        <tr>
                            <td>Hệ điều hành:</td>
                            <td>{{ product.oS }}</td>
                        </tr>
                        <tr>
                            <td>Thiết kế:</td>
                            <td>{{ product.design }}</td>
                        </tr>
                        <tr>
                            <td>Kích thước, Khối lượng:</td>
                            <td>{{ product.weight }}</td>
                        </tr>
                        <tr>
                            <td>Thời điểm ra mắt:</td>
                            <td>{{ product.releaseDate }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>

<script>
import productServiece from "../services/productAPI"
import cartService from "../services/cartAPI"
import userService from "../services/userAPI"
export default {
    props: ["id"],
    data() {
        return {
            product: "",
            userId: "",
        }
    },
    methods: {
        async getProduct() {
            await productServiece.getProduct(this.id).then((res) => {
                this.product = res.data
                this.number = res.data.number
            })
        },
        async addToCart() {
            if (sessionStorage.getItem("token") != null) {
                await userService.getInfor(sessionStorage.getItem("token")).then((res) => {
                    this.userId = res.data._id
                });
                const product = {
                    productId: this.id,
                    quantity: 1,
                    totalprice: this.product.price

                }
                await cartService.addToCart(this.userId, product).then((res) => {
                    alert('Bạn đã đặt hàng thành công!')
                })
            } else {
                this.$router.push("/login")
            }
        }
    },
    created() {
        this.getProduct()
    },
}
</script>