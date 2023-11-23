import API from "./API";
export default {
    login(phone, password) {
        return API().post("/lemonlap/users/loginad", { phoneNumber: phone, password: password })
    },
    listUsers(page) {
        return API().get("/lemonlap/users/listusers", { params: { page: page } })
    }
}