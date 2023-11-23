<template>
    <Header></Header>
    <div class="col-md-2 p-0">
        <Navbar></Navbar>
    </div>
    <div class="col-md-10 p-2">
        <div class="p-0 pb-5">
            <div class="p-3 text-center">
                <router-link to="/listproducts">
                    <i class="fa-solid fa-xmark" style="font-size: 30px; cursor: pointer; float: left;"></i>
                </router-link>
                <h3>CHỈNH SỬA SẢN PHẨM</h3>
            </div>
            <div style="width: 100%; margin: auto;">
                <form method="post" @submit.prevent="updateProduct()" enctype="multipart/form-data" id="form"
                    class="col-md-5 offset-4">
                    <div class="form-group mt-1">
                        <label for="productName">Tên Sản Phẩm:</label>
                        <input name="productName" type="text" class="form-control form-input" id="productName"
                            placeholder="Nhập tên sản phẩm" v-model="product.productName">
                    </div>
                    <div class="form-group mt-1">
                        <label for="price">Giá sản phẩm:</label>
                        <input name="price" type="number" min="1" class="form-control form-input" id="price"
                            placeholder="Nhập giá sản phẩm" style="width: 200px;" v-model="product.price">
                    </div>
                    <div class="form-group mt-1">
                        <label for="number">Số lượng trong kho:</label>
                        <input name="number" type="number" min="1" class="form-control form-input" id="number"
                            placeholder="Nhập số lượng trong kho" style="width: 200px;" v-model="product.number">
                    </div>
                    <div class="form-group mt-1">
                        <label for="brand" class="d-block">Hãng sản xuất:</label>
                        <select name="brand" id="brand" class="custom-select custom-select-md" style="width: 200px;"
                            v-model="product.brand">
                            <option value="Apple">Apple</option>
                            <option value="Asus">Asus</option>
                            <option value="HP">HP</option>
                            <option value="Acer">Acer</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="Dell">Dell</option>
                            <option value="MSI">MSI</option>
                        </select>
                    </div>
                    <div class="form-group mt-1">
                        <label for="cpu">CPU của máy:</label>
                        <input name="cpu" type="text" class="form-control form-input" id="cpu"
                            placeholder="Nhập CPU của máy" v-model="product.cpu">
                    </div>
                    <div class="form-group mt-1">
                        <label for="ram">Ram của máy:</label>
                        <input name="ram" type="text" class="form-control form-input" id="ram"
                            placeholder="Nhập RAM của máy" v-model="product.ram">
                    </div>
                    <div class="form-group mt-1">
                        <label for="hardDrive">Ổ cứng của máy</label>
                        <input name="hardDrive" type="text" class="form-control form-input" id="hardDrive"
                            placeholder="Nhập ổ cứng của máy" v-model="product.hardDrive">
                    </div>
                    <div class="form-group mt-1">
                        <label for="screen">Màn hình</label>
                        <input name="screen" type="text" class="form-control form-input" id="screen"
                            placeholder="Nhập thông số màn hình" v-model="product.screen">
                    </div>
                    <div class="form-group mt-1">
                        <label for="screenCard">Card màn hình</label>
                        <input name="screenCard" type="text" class="form-control form-input" id="screenCard"
                            placeholder="Nhập card màn hình" v-model="product.screenCard">
                    </div>
                    <div class="form-group mt-1">
                        <label for="port">Cổng kết nối</label>
                        <input name="port" type="text" class="form-control form-input" id="port"
                            placeholder="Nhập cổng kết nối" v-model="product.port">
                    </div>
                    <div class="form-group mt-1">
                        <label for="oS">Hệ điều hành</label>
                        <input name="oS" type="text" class="form-control form-input" id="oS"
                            placeholder="Hệ điều hành của máy" v-model="product.oS">
                    </div>
                    <div class="form-group mt-1">
                        <label for="design">Thiết kế vỏ máy</label>
                        <input name="design" type="text" class="form-control form-input" id="design"
                            placeholder="Thiết kế vỏ máy" v-model="product.design">
                    </div>
                    <div class="form-group mt-1">
                        <label for="weight">Kích thước, khối lượng:</label>
                        <input name="weight" type="text" class="form-control form-input" id="weight"
                            placeholder="Nhập kích thước và khối lượng" v-model="product.weight">
                    </div>
                    <div class="form-group mt-1">
                        <label for="releaseDate">Năm ra mắt</label>
                        <input name="releaseDate" type="text" class="form-control form-input" id="releaseDate"
                            placeholder="Năm ra mắt" v-model="product.releaseDate">
                    </div>
                    <div class="form-group mt-3 mb-0">
                        <label class="d-block" for="exampleFormControlFile1">Chọn 1 ảnh đại điện cho sản phẩm</label>
                        <div class="custom-file">
                            <label class="custom-file-label" for="customFile">Chọn 1 ảnh</label>
                            <input type="file" name="file" class="custom-file-input" id="customFile" ref="fileInput"
                                @click="handleFile()" accept="*">
                        </div>
                        <div id="frame" class="d-flex justify-content-around flex-wrap">
                            <img v-bind:src="'/image/' + product.avatar" alt=""
                                style="width:200px; height: 200px; object-fit: scale-down;">
                        </div>
                    </div>
                    <div class="form-group mt-3 mb-0">
                        <label class="d-block" for="exampleFormControlFile1">Chọn 2 đến 10 ảnh chi tiết sản phẩm</label>
                        <div class="custom-file">
                            <label class="custom-file-label" for="customFile1">Chọn 2 đến 10 ảnh</label>
                            <input type="file" name="files" class="custom-file-input" id="customFile1" ref="fileInputs"
                                @click="handleFile()" accept="*" multiple>
                        </div>
                        <div id="frame1" class="d-flex justify-content-around flex-wrap">
                            <div v-for="img in product.images">
                                <img v-bind:src="'/image/' + img.imageName" alt=""
                                    style="width:200px; height: 200px; object-fit: scale-down; margin-top: 20px;">
                            </div>
                        </div>
                    </div>
                    <span class="text-success">
                    </span>
                    <span style="color: green;">{{ message }}</span>
                    <div class="form-check pl-0 mt-3 d-flex justify-content-between">
                        <button type="submit" id="submit" class="btn btn-primary form-input mt-2 font-weight-bold p-2">SỬA
                            SẢN PHẨM</button>
                        <router-link to="/listproducts">
                            <button type="submit" id="submit"
                                class="btn btn-danger form-input mt-2 font-weight-bold p-2">TRỞ VỀ</button>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import productAPI from "../services/productAPI";
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
export default {
    components: {
        Header,
        Navbar
    },
    props: ["id"],
    data() {
        return {
            product: null,
            message: ""
        }
    },
    methods: {
        handleFile() {
            $(document).ready(function () {
                $('#customFile').change(function () {
                    $("#frame").html('');
                    $("#frame").empty();
                    $("#frame").append('<img class="item py-3" src="' + window.URL.createObjectURL(this.files[0]) +
                        '"width="300px" height="300px"/>');
                    $(".item").css({ "object-fit": "scale-down" });
                });
                $('#customFile1').change(function () {
                    $('#submit').prop('disabled', false);
                    $("#frame1").html('');
                    if ($(this)[0].files.length > 10) {
                        $("#frame1").append('<span class="text-danger">Số lượng ảnh không vượt quá 10</span>');
                        $('#submit').prop('disabled', true);
                    } else if ($(this)[0].files.length < 2) {
                        $("#frame1").append('<span class="text-danger">Số lượng ảnh không ít hơn 2 ảnh</span>');
                        $('#submit').prop('disabled', true);
                    } else {
                        for (var i = 0; i < $(this)[0].files.length; i++) {
                            $("#frame1").append('<img class="items" src="' + window.URL.createObjectURL(this.files[i]) +
                                '"width="200px" height="200px"/>');
                            $(".items").css({ "margin-top": "10px", "object-fit": "scale-down" });
                        }
                    }
                });
            })
        },
        async updateProduct() {
            try {
                const form = document.getElementById("form")
                const formData = new FormData(form)
                await productAPI.updateProduct(this.id, formData).then((res) => {
                    this.message = res.data;
                });
            } catch (err) {
                console.log(err);
            }
        },
        getProduct() {
            productAPI.getProduct(this.id).then((res) => {
                this.product = res.data;
            })
        },
    },
    created() {
        this.getProduct()
    }
}
</script>