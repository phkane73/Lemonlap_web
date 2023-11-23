<template>
    <div class="container-fluid" style="background-color: #B2B18F; height: 80px;">
        <h1 class="text-center" style="line-height: 80px; color: #F2ED4E; font-weight: bold; display: inline-block;">Admin
            Page</h1>
        <i class="fa-solid fa-right-from-bracket"
            style="color: #F2ED4E; line-height: 80px; float: right; cursor: pointer; font-size: 20px;"
            @click="logout()"></i>
        <img src="../assets/logo.png" alt="" style="width: 235px; height: 70px; margin-left: 50px; position: absolute; top: 0px; left: 720px;
            z-index: 10;">
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.push("/")
        }
    }
}

</script>