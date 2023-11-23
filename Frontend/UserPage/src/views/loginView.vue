<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center" style="height: 100vh;">
            <form class="col-md-5 bg-white p-4" method="post" @submit.prevent="login()">
                <RouterLink to="/">
                    <i class="fa-solid fa-circle-xmark" style="float: right; font-size: 30px; color: #D4B642;"></i>
                </RouterLink>
                <h1 class="text-center text-uppercase">Đăng nhập</h1>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại"
                        @change="clearErrors" v-model="phone">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                        @change="clearErrors" v-model="password">
                </div>
                <span style="color: red; display: block;">{{ message }}</span>
                <button type="submit" class="btn btn-primary mt-2">Đăng Nhập</button>
                <RouterLink to="/register">
                    <button type="submit" class="btn btn-danger float-right mt-2">Đăng Ký</button>
                </RouterLink>
            </form>
        </div>
    </div>
</template>

<style scoped></style>

<script>
import UserAPI from "../services/userAPI";


export default {
    name: "LoginView",
    data() {
        return {
            phone: "",
            password: "",
            message: "",
        }
    },
    methods: {
        async login() {
            await UserAPI.login(this.phone, this.password).then((res) => {
                const token = res.data;
                sessionStorage.setItem("token", token);
                this.$router.push("/");
            })
                .catch((err) => {
                    this.message = err.response.data.error
                })

        },
        clearErrors() {
            this.message = "";
        }
    }
}
</script>