<template>
    <div class="container-fluid bg-white">
        <div class="row m-0" style="height: 50px; background-color: #D4B642">
            <div class="container d-flex justify-content-between">
                <span style="line-height: 50px; cursor: default">Hotline: 0857487577</span>
                <div>
                    <div style="line-height: 50px" v-if="!token">
                        <RouterLink to="/login" class="link">Đăng nhập</RouterLink>
                        <span>/</span>
                        <RouterLink to="/register" class="link">Đăng ký</RouterLink>
                    </div>
                    <span style="line-height: 50px" v-if="token">Xin chào: {{ username }}</span>
                    <a v-if="token" @click="logout()" style="
              border: none;
              cursor: pointer;
              margin-left: 20px;
            ">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row bg-white" style="height: 130px">
                <div class="col-md-3">
                    <RouterLink to="/">
                        <img src="../assets/logo.png"
                            style="margin-left: -14px; width: 250px; height: 90px; margin-top: 10px;" />
                    </RouterLink>
                </div>
                <div class="col-md-8 d-flex">
                    <ul class="menu m-0 p-0">
                        <li class="menu-item">
                            <RouterLink class="link" to="/">Trang chủ</RouterLink>
                        </li>
                        <li class="menu-item">
                            <RouterLink class="link" to="/about">Giới thiệu</RouterLink>
                        </li>
                        <li class="menu-item">
                            <RouterLink class="link" to="/products">Sản phẩm</RouterLink>
                        </li>
                        <li class="menu-item">
                            <RouterLink class="link" to="/service">Dịch vụ</RouterLink>
                        </li>
                        <li class="menu-item">
                            <RouterLink class="link" to="/contact">Liên hệ</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="col-md-1 d-flex justify-content-end align-items-center">
                    <Order></Order>
                    <RouterLink class="link" to="/carts">
                        <i class="fa-solid fa-bag-shopping cart" style="font-size: 30px; position: relative">
                            <span style="
                  position: absolute;
                  font-size: 8px;
                  top: 16px;
                  left: 11px;
                  color: white;
                ">{{ number }}</span>
                        </i>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.menu-item .link {
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s linear;
}

.menu .link:hover {
    color: #D4B642;
}

.cart {
    transition: all 0.2s linear;
}

.cart:hover {
    color: #D4B642;
}
</style>
<script>
import UserAPI from "../services/userAPI";
import Order from "../components/order.vue"
export default {
    components: {
        Order
    },
    data() {
        return {
            user: [],
            token: sessionStorage.getItem("token"),
            username: ""
        }
    },
    methods: {
        async getInfor() {
            await UserAPI.getInfor(sessionStorage.getItem("token")).then((res) => {
                this.username = res.data.name
            })
        },
        logout() {
            sessionStorage.clear();
            this.token = sessionStorage.getItem("token")
        }
    },
    created() {
        this.getInfor()
    }
};
</script>