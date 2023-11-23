<template>
  <main>
    <div class="container">
      <div id="carouselExampleIndicators" class="carousel slide mb-5" data-ride="carousel" style="height: 540px">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="../assets/carosel1.jpg" style="height: 540px" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/carosel2.jpg" style="height: 540px" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/carosel3.jpg" style="height: 540px" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/carosel4.jpg" style="height: 540px" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/carosel5.jpg" style="height: 540px" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/carosel6.jpg" style="height: 540px" />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <i class="fa-solid fa-chevron-left" style="font-size: 30px; color: #D4B642"></i>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"
          style="background-color;: #D4B642">
          <i class="fa-solid fa-chevron-right" style="font-size: 30px; color: #D4B642"></i>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div class="section1" style="padding: 15px">
        <h1 class="text-center text-uppercase" style="
            color: black;
            font-weight: 700;
            margin-bottom: 50px;
            cursor: default;
          ">
          Gaming
        </h1>
        <div class="row d-flex justify-content-between">
          <div class="col-md-5 img1">
            <RouterLink to="/products">
              <img src="../assets/section1-img1.png" style="width: 100%; height: 300px" />
            </RouterLink>
          </div>
          <div class="col-md-5 img2">
            <RouterLink to="/products">
              <img src="../assets/section1-img2.png" style="width: 100%; height: 300px" />
            </RouterLink>
          </div>
        </div>
        <div class="row mt-5 d-flex justify-content-between">
          <div class="col-md-7 p-0 gamingbig" style="height: 500px">
            <RouterLink to="/products">
              <img src="../assets/section1-img5.jpg" style="width: 100%; height: 500px" />
            </RouterLink>
          </div>
          <div class="col-md-4">
            <div class="row" style="height: 240px">
              <RouterLink to="/products">
                <img src="../assets/section1-img4.jpg" style="width: 100%; height: 240px" />
              </RouterLink>
            </div>
            <div class="row" style="margin-top: 20px">
              <RouterLink to="/products">
                <img src="../assets/section1-img3.jpg" style="width: 100%; height: 240px" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="container section2 p-0">
        <div class="bigbanner">Uy tín, Nhanh chóng, Chất lượng</div>
        <h1 class="text-center text-uppercase" style="
            color: black;
            font-weight: 700;
            margin-bottom: 50px;
            cursor: default;
          ">
          Nhỏ gọn, nhẹ nhàng, tinh tế
        </h1>
        <div class="row mb-5 d-flex justify-content-between">
          <div class="col-md-5">
            <img src="../assets/section2-img1.jpg" style="width: 100%; height: 500px; border: none" />
          </div>
          <div class="col-md-7">
            <div class="row" style="height: 240px">
              <div class="col-md-6 mr-5">
                <RouterLink to="/products">
                  <img src="../assets/section2-img2.jpg" style="width: 100%; height: 240px" />
                </RouterLink>
              </div>
              <div class="col-md-5">
                <RouterLink to="/products">
                  <img src="../assets/section2-img3.jpg" style="width: 100%; height: 240px" />
                </RouterLink>
              </div>
            </div>
            <div class="row" style="height: 240px; margin-top: 20px">
              <div class="col-md-5 mr-5">
                <RouterLink to="/products">
                  <img src="../assets/section2-img5.jpg" style="width: 100%; height: 240px" />
                </RouterLink>
              </div>
              <div class="col-md-6">
                <RouterLink to="/products">
                  <img src="../assets/section2-img4.jpg" style="width: 100%; height: 240px" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container section3" style="background-color: white; height: 400px; margin-bottom: 100px">
        <h3 class="text-uppercase" style="font-weight: 600">24H Công nghệ</h3>
        <div class="row d-flex justify-content-between">
          <div class="col-md-4">
            <a href="https://www.thegioididong.com/tin-tuc/laptop-gaming-nhung-lai-mong-nhe-giam-gia-1553229">
              <img src="https://cdn.tgdd.vn/Files/2023/10/27/1553229/laptopgggg-1-271023-123755-800-resize.jpg"
                style="height: 300px; width: 100%" />
              <p>Laptop gaming nhưng lại mỏng nhẹ? Hoàn toàn có thật tại TGDĐ, lại còn giảm giá chỉ từ 14.99 triệu</p>
            </a>
          </div>
          <div class="col-md-4">
            <a
              href="https://www.thegioididong.com/tin-tuc/laptop-gia-re-qua-tu-9-79-trieu-ho-tro-tra-gop-ne-ban-oi-1552801">
              <img src="https://cdn.tgdd.vn/Files/2023/10/23/1552801/h2-231023-184723-800-resize.jpg"
                style="height: 300px; width: 100%" />
              <p>
                Apple Watch SE 2022 giảm cực sâu với giá chỉ từ 6.19 triệu,
                nhiều công nghệ mới
              </p>
            </a>
          </div>
          <div class="col-md-4">
            <a
              href="https://www.thegioididong.com/tin-tuc/tuan-le-thuong-hieu-dell-mua-ngay-laptop-xin-uu-dai-ngon-1552939">
              <img src="https://cdn.tgdd.vn/Files/2023/10/24/1552939/h2laptop_0-251023-134943-800-resize.jpg"
                style="height: 300px; width: 100%" />
              <p>
                Tuần lễ thương hiệu Dell: Mua ngay laptop xịn, nhận ưu đãi cực tốt trong ngày cuối
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.active {
  background-color: #D4B642 !important;
}

.carousel-indicators li {
  background-color: black;
}

.section1 .col-md-5 {
  padding: 0;
  border-radius: 10px;
}

.section1 img {
  border-radius: 10px;
  transition: all 0.2s linear;
}


.gamingbig {
  overflow: hidden;
  border-radius: 10px;
}

.col-md-4 .row {
  border-radius: 10px;
  overflow: hidden;
}


.bigbanner {
  width: 100%;
  height: 200px;
  background-image: url(../assets/bigbanner.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 50px;
  text-transform: uppercase;
  margin: 50px 0 50px 0;
  border-radius: 10px;
  cursor: default;
}

.section2 img {
  border: 3px solid black;
  transition: all 0.25s linear;
}

.section3 p {
  font-size: 20px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<script>
import router from '../router';


</script>
