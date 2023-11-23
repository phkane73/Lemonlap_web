<template>
    <Header></Header>
    <div class="col-md-2 p-0">
        <Navbar></Navbar>
    </div>
    <div class="col-md-10">
        <div class="p-0 mt-2 mb-5">
            <div class="p-3 text-center">
                <router-link to="/listproducts">
                    <i class="fa-solid fa-xmark" style="font-size: 30px; cursor: pointer; float: left;"></i>
                </router-link>
                <h3>THÊM SẢN PHẨM MỚI</h3>
            </div>
            <div style="width: 100%; margin: auto;">
                <form method="post" @submit.prevent="addProduct()" enctype="multipart/form-data" id="form"
                    class="col-md-5 offset-4" @change="clearMg">
                    <span style="color: green;">{{ message }}</span>
                    <div class="form-group mt-1">
                        <label for="productName">Tên Sản Phẩm:</label>
                        <input name="productName" type="text" class="form-control form-input" id="productName"
                            placeholder="Nhập tên sản phẩm" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="price">Giá sản phẩm:</label>
                        <input name="price" type="number" min="1" class="form-control form-input" id="price"
                            placeholder="Nhập giá sản phẩm" style="width: 200px;" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="number">Số lượng trong kho:</label>
                        <input name="number" type="number" min="1" class="form-control form-input" id="number"
                            placeholder="Nhập số lượng trong kho" style="width: 200px;" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="brand" class="d-block">Hãng sản xuất:</label>
                        <select name="brand" id="brand" class="custom-select custom-select-md" style="width: 200px;">
                            <option value="Apple">Macbook</option>
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
                            placeholder="Nhập CPU của máy" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="ram">Ram của máy:</label>
                        <input name="ram" type="text" class="form-control form-input" id="ram"
                            placeholder="Nhập RAM của máy" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="hardDrive">Ổ cứng của máy</label>
                        <input name="hardDrive" type="text" class="form-control form-input" id="hardDrive"
                            placeholder="Nhập ổ cứng của máy" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="screen">Màn hình</label>
                        <input name="screen" type="text" class="form-control form-input" id="screen"
                            placeholder="Nhập thông số màn hình" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="screenCard">Card màn hình</label>
                        <input name="screenCard" type="text" class="form-control form-input" id="screenCard"
                            placeholder="Nhập card màn hình" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="port">Cổng kết nối</label>
                        <input name="port" type="text" class="form-control form-input" id="port"
                            placeholder="Nhập cổng kết nối" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="oS">Hệ điều hành</label>
                        <input name="oS" type="text" class="form-control form-input" id="oS"
                            placeholder="Hệ điều hành của máy" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="design">Thiết kế vỏ máy</label>
                        <input name="design" type="text" class="form-control form-input" id="design"
                            placeholder="Thiết kế vỏ máy" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="weight">Kích thước, khối lượng:</label>
                        <input name="weight" type="text" class="form-control form-input" id="weight"
                            placeholder="Nhập kích thước và khối lượng" required>
                    </div>
                    <div class="form-group mt-1">
                        <label for="releaseDate">Năm ra mắt</label>
                        <input name="releaseDate" type="text" class="form-control form-input" id="releaseDate"
                            placeholder="Năm ra mắt" required>
                    </div>
                    <div class="form-group mt-3 mb-0">
                        <label class="d-block" for="exampleFormControlFile1">Chọn 1 ảnh đại điện cho sản phẩm</label>
                        <div class="custom-file">
                            <label class="custom-file-label" for="customFile">Chọn 1 ảnh</label>
                            <input type="file" name="file" class="custom-file-input" id="customFile" ref="fileInput"
                                @change="handleFile" accept="*" required>
                        </div>
                        <div id="frame" class="d-flex justify-content-around flex-wrap" style="object-fit: scale-down;">
                        </div>
                    </div>
                    <div class="form-group mt-3 mb-0">
                        <label class="d-block" for="exampleFormControlFile1">Chọn 2 đến 10 ảnh chi tiết sản phẩm</label>
                        <div class="custom-file">
                            <label class="custom-file-label" for="customFile1">Chọn 2 đến 10 ảnh</label>
                            <input type="file" name="files" class="custom-file-input" id="customFile1" ref="fileInputs"
                                accept="*" multiple required>
                        </div>
                        <div id="frame1" class="d-flex justify-content-around flex-wrap"></div>
                    </div>
                    <span class="text-success">
                    </span>
                    <div class="form-check pl-0 mt-3 ">
                        <button type="submit" id="submit"
                            class="btn btn-primary form-input mt-2 font-weight-bold w-100 p-2">THÊM
                            MỚI</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ProductAPI from "../services/productAPI"
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
export default {
    components: {
        Header,
        Navbar
    },
    data() {
        return {
            message: ""
        }
    },
    methods: {
        handleFile() {
            $(document).ready(function () {

                $('#customFile').change(function () {
                    $("#frame").html('');
                    $("#frame").empty();
                    $("#frame").append('<img class="item" src="' + window.URL.createObjectURL(this.files[0]) +
                        '"width="200px" height="200px"/>');
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
                            $(".items").css({ "margin-top": "10px", "margin-bottom": "15px", "object-fit": "scale-down" });

                        }
                    }
                });
            })
        },
        async addProduct() {
            try {
                const form = document.getElementById("form")
                const formData = new FormData(form)
                form.reset()
                $("#frame").html('');
                $("#frame1").html('');
                await ProductAPI.addProduct(formData).then((res) => {
                    this.message = res.data.message;
                    window.scrollTo(0, 0);
                });
            } catch (err) {
                console.log(err);
            }
        },
        clearMg() {
            this.message = "";
        }
    },
    created() {
        this.handleFile()
    }
}
</script>