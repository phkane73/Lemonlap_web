<template>
    <button type="button" class="btn btn-dark ml-1" data-toggle="modal" :data-target="'#' + orderId">Chi Tiết</button>

    <div :id="orderId" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="pl-5">Sản phẩm</th>
                            <th class="text-center">Số lượng</th>
                            <th class="text-center">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="orderItem in ordersDetails" :key="orderItem._id" style="line-height: 50px;">
                            <td class="pl-5 d-flex">
                                <img :src="'/image/' + orderItem.image" style="width: 85px; height: 90px;" alt="">
                                <p class="ml-4"> {{ orderItem.productId.productName }}</p>
                            </td>
                            <td class="text-center">{{ orderItem.quantityOrdersDetail }}</td>
                            <td class="text-center"> {{ new Intl.NumberFormat()
                                .format(orderItem.priceOrderDetails)
                                .replaceAll(",", ".") }}đ </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import ordersService from '../services/ordersAPI';
export default {
    data() {
        return {
            ordersDetails: [],
        }
    },
    props: ["orderId"],
    methods: {
        async OrdersDetails(id) {
            await ordersService.getOrdersDetails(id).then((res) => {
                this.ordersDetails = res.data;
            })
        }
    },
    created() {
        this.OrdersDetails(this.orderId)
    }
}
</script>