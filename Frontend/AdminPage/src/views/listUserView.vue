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
                    <th class="title" scope="col">STT</th>
                    <th class="title" scope="col">Tên Khách Hàng</th>
                    <th class="title" scope="col">Số điện thoại</th>
                    <th class="title" scope="col">Địa chỉ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user, index in users" :key="user._id">
                    <th class="user" scope="row">{{ index + 1 }}</th>
                    <th class="user" scope="col">{{ user.name }}</th>
                    <th class="user" scope="col">{{ user.phoneNumber }}</th>
                    <th class="user" scope="col">{{ user.address }}</th>
                </tr>
            </tbody>
        </table>
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
</template>

<style scoped>
.user {
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
import userAPI from '../services/userAPI';
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
export default {
    components: {
        Header,
        Navbar
    },
    name: "ListUsers",
    data() {
        return {
            users: [],
            page: 1,
            totalPages: 0
        }
    },
    methods: {
        async ListUsers() {
            await userAPI.listUsers(this.page).then((res) => {
                console.log(res.data);
                this.users = res.data.users;
                this.page = res.data.currentPage;
                this.totalPages = res.data.totalPages;
            })
        },
        async currentPage(page) {
            document.getElementById(this.page).classList.remove("active");
            this.page = page;
            this.ListUsers();
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
        this.ListUsers();
        this.scroll()
    }
}
</script>