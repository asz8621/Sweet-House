<template>
  <div class="about">
    <VueLoading loading :active.sync="isLoading">
      <loading></loading>
    </VueLoading>
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
    <section>
      <card card-class-name="new" card-title="新品上市" :card-data="latestProducts" :carts="carts"></card>
      <card card-class-name="hot" card-title="熱銷商品" :card-data="hotProduct" :carts="carts"></card>
    </section>
    <section class="subscription bg-img">
      <div class="subscription-1">
          <h4 class="subscription-title">香甜傳遞</h4>
          <p class="subscription-text">弄甜屋每季會推出新產品以及專屬優惠碼，立即輸入信箱讓香甜傳達到您心裡！</p>
            <form action="" class="subscription-form-group">
              <ValidationProvider ref="sendEDM" tag="div" rules="required|email" v-slot="{ errors, classes }" class="input-group mb-3">
                <input type="email" class="form-control h-100" :class="classes"
                name="信箱" placeholder="請輸入電子信箱" v-model="form.email">
                <span class="subscription-errormsg invalid-feedback">{{errors[0]}}</span>
                <div class="input-group-append">
                  <button type="button" class="large-size btn btn-main" @click.prevent="sendEDM">訂閱</button>
                </div>
              </ValidationProvider>
            </form>
      </div>
    </section>
  </div>
</template>
<script>
import loading from '../../components/Loading.vue';
import card from '../../components/Card.vue';

export default {
  props: ['carts'],
  components: {
    loading,
    card,
  },
  data() {
    return {
      isLoading: false,
      tempProduct: {},
      hotProduct: {},
      latestProducts: {},
      form: {
        email: '',
      },
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() { // 讀取所有商品資料
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          this.latestProducts = this.tempProduct.slice(0, 5);
          this.hotProduct = this.tempProduct.filter((item) => item.options.isHot);
          this.isLoading = false;
        })
        .catch(() => {
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
    },
    sendEDM() {
      if (this.$refs.sendEDM.errors.length === 0 && this.form.email !== '') {
        this.$toast.success('電子報傳送成功');
        this.form.email = '';
        this.$refs.sendEDM.reset();
      }
    },
  },
};
</script>
<style lang="scss">
.subscription {
  background-image: url(~@/assets/images/Subscription.jpg);
  height: 400px;
  background-attachment: fixed;
  position: relative;
}
.subscription-1 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.75);
  color: #4c4e56;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}

// .subscription-text {
//   color: #4c4e56;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// }
.subscription-title {
  font-weight: bold;
  font-size: 2rem;
}

.subscription-form-group{
  display: flex;
  // justify-content: center;
  width: 100%;
  .subscription-mail{
    border: 1px solid #867162;
    border-radius: 5px 0 0 5px;
    outline: none;
    padding: 0.25rem 0.5rem;
    // width: 75%;
  }
  .btn-subscription{
    font-size: 1.25rem;
    border-radius: 0 5px 5px 0;
    // width: 25%;
  }
}
.subscription-errormsg{
  position: absolute;
  bottom: -25px;
  left: 0;
}
@media (min-width: 414px) {
  .subscription-1 {
    padding: 3rem;
  }
}
@media (min-width: 576px) {
  .subscription-form-group{
    width: 420px;
  }
}
@media (min-width: 991px) {
  .subscription-1 {
    padding: 6rem;
  }
}
</style>
