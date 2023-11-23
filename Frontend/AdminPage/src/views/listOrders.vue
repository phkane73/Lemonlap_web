<template>
    <Header></Header>
    <div class="col-md-2 p-0">
        <Navbar></Navbar>
    </div>
    <div class="col-md-10 p-2">
        <h2 class="text-center font-weight-bold">Danh sách người dùng</h2>
        <table class="table table-striped">
            <thead style="background-color: black;">
                <tr class="text-center">
                    <th class="title" scope="col">Ngày đặt hàng</th>
                    <th class="title" scope="col">Tên Khách Hàng</th>
                    <th class="title" scope="col">Số điện thoại</th>
                    <th class="title" scope="col">Địa chỉ</th>
                    <th class="title" scope="col">Tổng tiền đơn hàng</th>
                    <th class="title" scope="col">Xác nhận</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order._id">
                    <th class="order" scope="row">{{ order.dateOrder }}</th>
                    <th class="order" scope="col">{{ order.user.name }}</th>
                    <th class="order" scope="col">{{ order.user.phoneNumber }}</th>
                    <th class="order" scope="col">{{ order.address }}</th>
                    <th class="order" scope="col">{{ new Intl.NumberFormat()
                        .format(order.totalpriceOrder)
                        .replaceAll(",", ".") }}đ </th>
                    <td class="text-center">
                        <button v-if="order.statusOrder == 0" class="btn btn-primary"
                            @click="ordersConfirmation(order._id)">Xác Nhận</button>
                        <p class="text-secondary" v-else>Đã xác nhận</p>
                        <orderDetail :order-id="order._id"></orderDetail>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.order {
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
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
import OrderService from "../services/ordersAPI"
import orderDetail from "../components/orderDetail.vue"
import moment from "moment"
export default {
    components: {
        Header,
        Navbar,
        orderDetail,
    },
    data() {
        return {
            orders: [],
            dateNow: moment().format("YYYY-MM-DD")
        }
    },
    methods: {
        async getAllorders() {
            await OrderService.getAllOrders().then((res) => {
                this.orders = res.data;
                this.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            })
        },
        async ordersConfirmation(id) {
            await OrderService.confirmOrders(id).then(() => {
                this.getAllorders();
            })
                .catch(e => {
                    console.log(e);
                })
        }
    },
    created() {
        this.getAllorders();
    }
}
</script>