<template>
    <section class="p-4">
      <div class="container">
        <div class="headline py-4">
          <h2>熱銷商品</h2>
          <a href="#" class="btn btn-outline-main headline-link">更多</a>
          <hr class="headline-bottom">
        </div>
        <!-- <div class="hh">
          <h3>熱銷商品</h3>
          <a href="#" class="btn btn-outline-main">更多</a>
        </div> -->
        <!-- <hr /> -->
      </div>
      <div class="container">
        <div class="div">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
              <div class="card">
                <img
                  src="../assets/images/cake/1/cake1.jpg"
                  alt=""
                  class="img-fluid mb-3 card-img"
                />
                <h4 class="card-title">title1</h4>
                <div class="price">
                  <span>$ 1,940</span>
                  <span>$ 980</span>
                </div>
                <button class="btn btn-main btn-card">加入購物車</button>
                <!-- <button class="btn btn-main btn-card" disabled>已售完</button> -->
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <img
                  src="../assets/images/cake/1/cake1.jpg"
                  alt=""
                  class="img-fluid mb-3 card-img"
                />
                <h4 class="card-title">title1</h4>
                <div class="price">
                  <span>$ 1,940</span>
                  <span>$ 980</span>
                </div>
                <button class="btn btn-main btn-card">加入購物車</button>
                <!-- <button class="btn btn-main btn-card" disabled>已售完</button> -->
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <img
                  src="../assets/images/cake/1/cake1.jpg"
                  alt=""
                  class="img-fluid mb-3 card-img"
                />
                <h4 class="card-title">title1</h4>
                <div class="price">
                  <span>$ 1,940</span>
                  <span>$ 980</span>
                </div>
                <button class="btn btn-main btn-card">加入購物車</button>
                <!-- <button class="btn btn-main btn-card" disabled>已售完</button> -->
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="card">
                <img
                  src="../assets/images/cake/1/cake1.jpg"
                  alt=""
                  class="img-fluid mb-3 card-img"
                />
                <h4 class="card-title">title1</h4>
                <div class="price">
                  <span>$ 1,940</span>
                  <span>$ 980</span>
                </div>
                <button class="btn btn-main btn-card">加入購物車</button>
                <!-- <button class="btn btn-main btn-card" disabled>已售完</button> -->
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'card',
  props: {
    msg: String,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        // spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          540: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .div{
      position: relative;
    }
    .qs {
      position: relative;
      padding: 2rem;
    }
    .hh {
      display: flex;
      justify-content: space-between;
    }
    .hh h3 {
      font-weight: bold;
    }
    .hh + hr::after {
      content: "";
      border-top: 4px solid #f7c099;
      width: 100px;
      display: block;
      position: relative;
      top: -2.5px;
      left: 0;
    }
    .card {
      padding: 0.75rem;
      margin-bottom: 1.25rem;
      border: none;
    }
    .card img {
      transition: 0.5s;
    }
    .card:hover img {
      transform:scale(1.05);
    }
    .card-img {
      border-radius: 5px;
    }
    .price {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }
    .btn-card {
      width: 80%;
      margin: auto;
    }
    .btn-card:disabled {
      cursor: not-allowed;
    }
    .swiper-button-prev,.swiper-button-next{
      display: none;
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 0;
    }
    .slideControls .slidePrev {
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 2rem;
      color: #867162;
      z-index: 100;
    }
    .slideControls .slideNext {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 2rem;
      color: #867162;
      z-index: 100;
    }
    @media (min-width: 768px) {
      /* 768 以上 */
      .swiper-button-prev{
        display: block;
        left: -50px;
        color: #867162;
      }
      .swiper-button-next{
        display: block;
        right: -50px;
        color: #867162;
      }
    }
</style>
