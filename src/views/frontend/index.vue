<template>
  <div class="about">
    <section class="content mb-6">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <!-- <img src="../assets/images/Cake.jpg" class="d-block w-100" alt="..." /> -->
            <div class="bg-img img1"></div>
          </div>
          <div class="carousel-item">
            <!-- <img src="images/CupCake.jpg" class="d-block w-100" alt="..." /> -->
            <div class="bg-img img2"></div>
          </div>
          <div class="carousel-item">
            <!-- <img src="images/Macaron.jpg" class="d-block w-100" alt="..." /> -->
            <div class="bg-img img3"></div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </section>
    <cards></cards>
    <section class="subscription bg-img">
      <div class="subscription-1">
        <div class="subscription-text">
          <h4 class="subscription-title">訂閱專區</h4>
          <p>弄甜屋每季會推出新產品以及專屬優惠碼，請不要錯過哦！</p>
          <form action="">
            <input type="text" class="" placeholder="請輸入電子信箱" />
            <button type="button" class="btn btn-main">訂閱</button>
          </form>
        </div>
      </div>
      <!-- <div class="container">
        <div class="row">
          <div class="col-12 col-md-8 col-lg-5"> -->

      <!-- </div>
        </div>
      </div> -->
    </section>
  </div>
</template>
<script>
import cards from '../../components/Card.vue';

export default {
  components: {
    cards,
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>
<style lang="scss">
</style>
