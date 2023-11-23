<template>
    <div class="container" style="min-height: 600px">
        <div class="row">
            <div class="col-md-8 my-3">
                <h3 class="text-center text-uppercase font-weight-bold">Giỏ Hàng</h3>
                <div v-if="length == 0" style="
              background-color: white;
              height: 500px;
              display: flex;
              justify-content: center;
            ">
                    <img src="../assets/empty_cart.png" />
                </div>
                <div class="card my-2" v-for="product in products" v-bind:key="product._id">
                    <div class="card-header d-flex justify-content-between align-items-center" style="height: 48px">
                        <span style="font-weight: bold">{{ product.productId.productName }}</span>
                        <button class="btn btn-danger" @click="deleteCartDetail(product.productId._id)">
                            <i style="font-size: 15px" class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div class="card-body d-flex justify-content-between align-items-center">
                        <RouterLink :to="'products/' + product.productId._id">
                            <img v-bind:src="'image/' + product.productId.avatar
                                " class="card-img-top p-3"
                                style="width: 150px; height: 100px; object-fit: scale-down" />
                        </RouterLink>
                        <div class="d-flex flex-column">
                            <span style="font-weight: bold">Đơn giá</span>
                            <span>
                                {{
                                    new Intl.NumberFormat()
                                        .format(product.productId.price)
                                        .replaceAll(",", ".")
                                }}đ
                            </span>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="decrease(product.productId._id)" value="-">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                </div>
                                <div class="input-group-prepend">
                                    <input type="number" min="1" :value="product.quantity" style="
                            max-width: 50px;
                            text-align: center;
                            border: none;
                          " disabled />
                                </div>
                                <div class="input-group-append m-0">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="increase(product.productId._id)" value="+">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <span style="font-weight: bold">Thành tiền</span>
                            <span>
                                {{
                                    new Intl.NumberFormat()
                                        .format(product.totalprice)
                                        .replaceAll(",", ".")
                                }}đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4" style="margin-top: 58px">
                <div class="row card d-flex justify-content-center align-items-center"
                    style="background-color: white; height: 48px; font-weight: bold">
                    <span>Thanh toán</span>
                </div>
                <div class="row mt-3 card p-3" style="font-size: 14px">
                    <div class="d-flex justify-content-between mt-2">
                        <span>Địa chỉ</span>
                        <input type="text" style="width: 250px;" v-model="address">
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <span>Tổng tạm tính</span>
                        <span>{{ new Intl.NumberFormat()
                            .format(totalPriceByCart)
                            .replaceAll(",", ".") }} đ</span>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <span>Thành tiền (Đã bao gồm VAT)</span>
                        <span style="color: red;">{{ new Intl.NumberFormat()
                            .format(Math.ceil(totalPriceByCart + ((totalPriceByCart * 5) / 100)))
                            .replaceAll(",", ".") }} đ</span>
                    </div>
                </div>
                <div class="row d-flex align-items-center" v-if="length != 0">
                    <button type="button" class="btn my-2 p-3 buy w-100 text-light" @click="addToOrder()"
                        style="cursor: pointer; background-color: #1535c1; font-weight: bold; text-transform: uppercase;">Đặt
                        hàng</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped></style>
  
<script>
import cartService from "../services/cartAPI"
import userService from "../services/userAPI"
import ordersAPI from "../services/ordersAPI"
export default {
    name: "cart",
    data: () => ({
        userId: "",
        products: [],
        length: 0,
        totalPriceByCart: 0,
        address: "",
        cart: []
    }),
    methods: {
        async getAllCart() {
            await userService.getInfor(sessionStorage.getItem("token")).then((res) => {
                this.userId = res.data._id
                this.address = res.data.address
            });
            await cartService.getAllCarts(this.userId).then((res) => {
                this.products = res.data.products
                this.products.sort((a, b) => new Date(b.date) - new Date(a.date));
                this.cart = res.data
                this.length = res.data.products.length;
                this.totalPriceByCart = this.products.reduce((total, product) => {
                    return total + product.totalprice
                }, 0)
            })
        },
        async increase(productId) {
            await cartService.increase(this.userId, productId).then((res) => {
                this.getAllCart()
            });
        },
        async decrease(productId) {
            await cartService.decrease(this.userId, productId).then((res) => {
                this.getAllCart()
            });
        },
        async deleteCartDetail(productId) {
            await cartService.delete(this.userId, productId).then((res) => {
                this.getAllCart()
            })
        },
        async addToOrder() {
            try {
                await ordersAPI.createOrder(this.cart, this.address, Math.ceil(this.totalPriceByCart + ((this.totalPriceByCart * 5) / 100))).then((res) => {
                    alert("Bạn đã đặt hàng thành công")
                    window.location.reload()
                    this.length = 0
                });
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getAllCart()
    }
}
</script>
  