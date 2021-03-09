<template>
  <div class="content">
    <VueLoading loading :active.sync="status.isLoading">
      <loading></loading>
    </VueLoading>
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

              <!-- 有特價 -->
              <div class="price mb-3 text-right" v-if="item.origin_price !== item.price">
                <div class="original mb-1">NT$ {{item.origin_price}}</div>
                <div class="onSale mb-3">NT$ {{item.price}}</div>
              </div>

              <!-- 沒有特價 -->
              <div class="price mb-3 text-right" v-else>
                <div class="onSale mb-1"><span>售價</span>NT$ {{item.origin_price}}</div>
              </div>

            </div>
          </div>
          <div class="single-features-btn" :style="{'right': status.btnLoading === item.id ? '2px' : ''}">
            <button type="button" class="addcart large-size btn btn-main w-100" @click.prevent="addCart(item.id)" :disabled="status.btnLoading !== '' ">
              <i class="fas fa-cart-plus d-none d-lg-block"></i>
              <span class="addcart-text">加入購物車</span>
              <div class="spinner-border spinner-border-sm ml-2" role="status"
               v-if="status.btnLoading === item.id">
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

import loading from '../../components/Loading.vue';
import Breadcrumb from '../../components/Breadcrumb.vue';

export default {
  props: ['carts'],
  components: {
    loading,
    Breadcrumb,
  },
  data() {
    return {
      product: {},
      tempProduct: {},
      pagination: {},
      classificationName: '',
      typeProduct: [], // 產品切換
      classification: [], // 大類別
      classificationTop: true,
      quantity: 1,
      paddingTop: true, // 控制麵包屑
      status: {
        isLoading: false,
        btnLoading: '',
      },
    };
  },
  created() {
    this.status.isLoading = true;
  },
  mounted() {
    this.getProducts();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() { // 滾動偵測切換 classificationTop 位置
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 50) {
        this.classificationTop = false;
      } else {
        this.classificationTop = true;
      }
    },
    filterProducts(type) { // 產品切換
      // 清空內容
      this.typeProduct = [];
      this.classificationName = type;
      // 全部就拷貝
      if (type === '全部產品') {
        this.typeProduct = { ...this.product };
      }
      // 不是全部跑迴圈
      this.product.forEach((item) => {
        if (item.category === type) {
          this.typeProduct.push(item);
        }
      });
    },
    del() { // 刪除購物車
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(api).then((res) => {
        // this.tempProduct = res.data.data;
        console.log('del', res);
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        console.log(error);
        this.status.isLoading = false;
      });
    },
    addCart(id, quantity = 1) { // 加入購物車
      this.status.btnLoading = id;
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
        this.status.btnLoading = '';
      }).catch((errors) => {
        this.$toast.error(`${errors.response.data.errors}`, { icon: 'fas fa-times' });
        this.status.btnLoading = '';
      });
    },
    getProducts() { // 讀取所有商品資料
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api)
        .then((res) => {
          // 取得產品列表
          this.product = res.data.data;
          this.typeProduct = res.data.data;
          this.classificationName = '全部產品';
          this.pagination = res.data.meta.pagination; // 取得分頁資訊

          // 建立大類別
          const classificationAll = this.product.map((item) => item.category);
          classificationAll.splice(0, 0, '全部產品');
          // 移除陣列重複的值
          this.classification = classificationAll.filter((element, index, arr) => arr.indexOf(element) === index);

          // 關閉 Loading
          this.status.isLoading = false;
        })
        .catch(() => {
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
    },
  },
};
</script>
<style lang="scss">
</style>
