<template>
    <button class="fa-solid fa-receipt" type="button" data-toggle="modal" data-target=".bd-example-modal-lg"
        style="font-size: 27px; margin-right: 15px; position: relative; padding: 0; border: none;">
    </button>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content p-3">
                <div class="container">
                    <h2 class="text-center">Đơn hàng đã đặt</h2>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mt-3" v-for="order in orders" :key="order.id">
                                <div class="card-header" style="font-weight: bold;">
                                    Đặt vào {{ order.dateOrder }}
                                </div>
                                <div class="card-body d-flex justify-content-between">
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: bold">Thành tiền</span>
                                        <span>
                                            {{
                                                new Intl.NumberFormat()
                                                    .format(order.totalpriceOrder)
                                                    .replaceAll(",", ".")
                                            }}đ
                                        </span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: bold">Gửi đến</span>
                                        <span>
                                            {{ order.address }}
                                        </span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: bold">Trạng thái</span>
                                        <span style="color: red;" v-if="order.statusOrder == 0">Đang chờ duyệt</span>
                                        <span style="color: green;" v-if="order.statusOrder != 0">Đang giao hàng</span>
                                    </div>
                                </div>
                                <orderDetail :order-id="order._id"></orderDetail>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>
import orderService from "../services/ordersAPI"
import userService from "../services/userAPI"
import orderDetail from "./orderDetail.vue";
export default {
    name: "order",
    components: {
        orderDetail
    },
    data: () => ({
        orders: [],
        userId: "",
    }),
    methods: {
        async getOrder() {
            await userService.getInfor(sessionStorage.getItem("token")).then((res) => {
                this.userId = res.data._id
            });
            await orderService.getOrder(this.userId).then((res) => {
                this.orders = res.data
                this.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            })
        },
    },
    created() {
        this.getOrder()
    },
};
</script>