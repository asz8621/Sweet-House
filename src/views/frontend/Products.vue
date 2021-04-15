<template>
  <div class="content">
    <div class="container pt-5 pb-5">
      <Breadcrumb :padding-top="paddingTop"></Breadcrumb>
      <ul class="classification d-flex p-4 px-md-0 py-md-5" :style="{ 'top' : classificationTop ? '115px' : '88px' }">
        <li v-for="item in classification" :key="item.name">
          <a class="classification-link p-3"
          href="javascript:;"
          :class="{ 'active':classificationName === item }"
          @click.prevent="filterProducts(item)">{{item}}</a>
        </li>
      </ul>
      <ul class="row">
        <li class="col-6 col-sm-4 col-lg-3 mb-6 mb-md-4"
        v-for="item in typeProduct" :key="item.id">
        <div class="product-item">
          <div class="product-content">
            <div class="product-content-img cursor-pointer">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.imageUrl" alt="" class="img-fluid">
              </router-link>
            </div>
            <div class="product-content-text">
              <h2 class="title my-3">{{item.title}}</h2>

              <!-- 價錢 -->
              <div class="price mb-3 text-right">
                <div class="original mb-1" v-if="item.origin_price !== item.price">NT$ {{item.origin_price | thousands}}</div>
                <div class="onSale mb-3">NT$ {{item.price | thousands}}</div>
              </div>

            </div>
          </div>
          <div class="single-features-btn" :style="{'right': btnLoading === item.id ? '2px' : ''}">
            <button type="button" class="addcart large-size btn btn-main w-100" @click.prevent="addCart(item.id)" :disabled="btnLoading !== '' ">
              <i class="fas fa-cart-plus d-none d-lg-block"></i>
              <span class="addcart-text">加入購物車</span>
              <div class="spinner-border spinner-border-sm ml-2" role="status"
               v-if="btnLoading === item.id">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery';

import { mapGetters, mapActions } from 'vuex';
import Breadcrumb from '../../components/Breadcrumb.vue';
// Getters 及 mapGetters, mapActions
export default {
  props: ['carts'],
  components: {
    Breadcrumb,
  },
  data() {
    return {
      // product: {},
      // pagination: {},
      // classificationName: '',
      // typeProduct: [], // 產品切換
      // classification: [], // 大類別
      classificationTop: true,
      quantity: 1,
      paddingTop: true, // 控制麵包屑
      btnLoading: '',
    };
  },
  computed: {
    ...mapGetters('productsModules', ['product', 'typeProduct', 'pagination', 'classification', 'classificationName']),
  },
  created() {
    this.getProducts();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions('productsModules', ['filterProducts', 'getProducts']),
    handleScroll() { // 滾動偵測切換 classificationTop 位置
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 50) {
        this.classificationTop = false;
      } else {
        this.classificationTop = true;
      }
    },
    addCart(id, quantity = 1) { // 加入購物車
      this.btnLoading = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      let httpMethod = 'post';
      let qty = quantity; // 數量
      let statusBtn = 'add'; // 預設 add
      // 如果購物車有一樣的產品做更新
      const mapData = this.carts.filter((item) => id === item.product.id);
      if (mapData.length > 0) {
        httpMethod = 'patch';
        qty += mapData[0].quantity;
        statusBtn = 'edit';
      }
      const cart = {
        product: id,
        quantity: qty,
      };
      this.$http[httpMethod](api, cart).then(() => {
        this.$bus.$emit('getcart', statusBtn);
        this.btnLoading = '';
      }).catch((errors) => {
        this.$toast.error(`${errors.response.data.errors}`, { icon: 'fas fa-times' });
        this.btnLoading = '';
      });
    },
  },
};
</script>
<style lang="scss">
</style>
