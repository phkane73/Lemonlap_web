<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center" style="height: 100vh;">
      <form class="col-md-5 p-4 bg-white" method="post" @submit.prevent="register()" id="form">
        <RouterLink to="/">
          <i class="fa-solid fa-circle-xmark" style="float: right; font-size: 30px; color: #D4B642;"></i>
        </RouterLink>
        <h1 class="text-center text-uppercase">Đăng ký</h1>
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại" v-model="phone"
            @change="clearError">
        </div>
        <span style="color: red;">{{ errorPhone }}</span>
        <div class="form-group">
          <label for="username">Họ Tên</label>
          <input type="text" class="form-control" id="username" placeholder="Nhập tên" v-model="username"
            @change="clearError">
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="Nhập địa chỉ" v-model="address"
            @change="clearError">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password"
            @change="clearError">
        </div>
        <div class="form-group">
          <label for="passwordcfm">Confirm Password</label>
          <input type="password" class="form-control" id="passwordcfm" placeholder="Nhập lại mật khẩu"
            @change="clearError" required>
          <span style="color: red;">{{ errorPasswordCfm }}</span>
        </div>
        <span style="color: red; display: block;">{{ errorPassword }}</span>
        <span style="color: red; display: block;">{{ error }}</span>
        <button type="submit" class="btn btn-primary mt-2">Đăng Ký</button>
        <RouterLink to="/login">
          <button type="submit" class="btn btn-danger float-right mt-2">Đăng Nhập</button>
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import UserAPI from "../services/userAPI";
export default {
  name: "RegisterView",
  data() {
    return {
      phone: "",
      username: "",
      address: "",
      password: "",
      error: "",
      message: "",
      errorPhone: "",
      errorPassword: "",
      errorPasswordCfm: "",
    }
  },
  methods: {
    async register() {
      const password = document.getElementById("password");
      const passwordcfm = document.getElementById("passwordcfm");
      if (password.value === passwordcfm.value) {
        await UserAPI.register(this.phone, this.username, this.address, this.password).then(res => {
          alert("Đăng ký thành công");
          UserAPI.login(this.phone, this.password).then((res) => {
            const token = res.data;
            sessionStorage.setItem("token", token);
            this.$router.push("/");
          })
        })
          .catch(err => {
            const error = err.response.data
            this.error = error.error
            if (error.errors.phoneNumber) {
              this.errorPhone = error.errors.phoneNumber.message
            }
            if (error.errors.password) {
              this.errorPassword = error.errors.password.message
            }
          })
      } else {
        this.errorPasswordCfm = "Nhập lại mật khẩu không chính xác!"
      }
    },
    clearError() {
      this.error = "";
      this.message = "";
      this.errorPhone = "";
      this.errorPassword = "";
      this.errorPasswordCfm = "";
    }
  },
}
</script>
