<template>
  <div class="about">
    <section class="content mb-6">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="bg-img img1"></div>
          </div>
          <div class="carousel-item">
            <div class="bg-img img2"></div>
          </div>
          <div class="carousel-item">
            <div class="bg-img img3"></div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators"
          role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators"
          role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </section>
    <section class="mb-6">
      <card card-class-name="new" card-title="新品上市" :card-data="latestProducts" :carts="carts"></card>
      <card card-class-name="hot" card-title="熱銷商品" :card-data="hotProduct" :carts="carts"></card>
    </section>
    <section class="subscription bg-img">
      <div class="subscription-all">
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
import card from '../../components/IndexCard.vue';

export default {
  props: ['carts'],
  components: {
    card,
  },
  data() {
    return {
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
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          this.latestProducts = this.tempProduct.slice(0, 5);
          this.hotProduct = this.tempProduct.filter((item) => item.options.isHot);
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
    },
    sendEDM() { // 訂閱
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
</style>
