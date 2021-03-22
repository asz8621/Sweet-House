<template>
  <div class="home">
    <VueLoading loading :active.sync="isLoading">
      <loading></loading>
    </VueLoading>
    <VueWindowResize v-show="true" v-model="window"/>
    <header class="header">
      <nav class="nav-top">
        <div class="menu-icon cursor-pointer" @click="mobileMenu" :class="{ 'opened': menu.openMobileMenu }">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <router-link to="/">
          <img src="../../assets/images/logo.png" alt="" class="logo"
          :style="{ 'height' : logoMaxHeight ? '100px' : '70px' }" />
        </router-link>
        <ul class="link-top">
          <li>
            <a href="javascript:;"
            class="text-main p-3"
            @click.prevent="isSearch">
              <i class="fas fa-search"></i>
            </a>
            <div id="search" class="search cursor-pointer" :class="{ 'opened': search }">
              <input
                type="text"
                class="search-text"
                placeholder="請輸入產品名稱"
              />
              <button class="btn btn-primary">搜尋</button>
              <i class="search-close fas fa-times" @click.prevent="isSearch"></i>
            </div>
          </li>
          <li v-if="this.$route.path !== '/checkout'">
            <a
              href="javascript:;"
              class="text-main p-3"
              data-toggle="modal"
              data-target="#cartModal"
              >
              <i class="fas fa-shopping-cart"></i>
              <span class="badge badge-primary rounded-circle cartnum-text">{{carts.length}}</span>
            </a>
          </li>
        </ul>
      </nav>
      <nav class="menu">
        <div class="container">
          <ul class="menu-down" :class="{ 'show': menu.openMenuDown }">
            <li class="menu-down-item">
              <img src="../../assets/images/logo.png" alt="" class="logo" />
            </li>
            <li class="menu-down-item" @click="clearStyle">
              <router-link to="/products" class="menu-down-link text-main"><i class="fab fa-product-hunt mr-2"></i>產品</router-link>
            </li>
            <li class="menu-down-item" @click="clearStyle">
              <router-link to="/about" class="menu-down-link text-main"><i class="far fa-handshake mr-2"></i>關於弄甜屋</router-link>
            </li>
            <li class="menu-down-item" @click="clearStyle">
              <router-link to="/contact" class="menu-down-link text-main"><i class="far fa-address-card mr-2"></i>聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view :carts="carts"></router-view>

    <footer v-if="this.$route.path !== '/checkout'"
    :class="{'footer-mb': this.$route.path.indexOf('/product/') === 0}">
      <div class="footer py-5">
        <div class="footer-media">
          <img src="../../assets/images/logo.png" alt="" height="150" class="footer-logo" />
          <ul>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-facebook-square"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-instagram-square"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-info">
          <ul>
            <li class="py-1">
              <span>
                <i class="fas fa-phone"></i>電話：
              </span>
              <a href="tel:07-5168168">07-5168168</a>
            </li>
            <li class="py-1">
              <span>
                <i class="far fa-envelope"></i>信箱：
              </span>
              <a href="mailto:money168@give.com">money168@give.com</a>
            </li>
            <li class="py-1">
              <span>
                <i class="fas fa-map-marked-alt"></i>地址：高雄市前鎮區凱旺街1號
              </span>
            </li>
            <li class="py-1">
              <span>
                <i class="far fa-clock"></i>營業時間：8:00 ~ 20:00
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-center py-3">
        Copyright 2020 © 弄甜屋 All Rights Reserved.
      </div>
    </footer>
    <CartModal :carts="carts" :price-total="priceTotal"></CartModal>
  </div>
</template>

<script>
import $ from 'jquery';
import loading from '../../components/Loading.vue';
import CartModal from '../../components/modal/CartModal.vue';

export default {
  components: {
    loading,
    CartModal,
  },
  data() {
    return {
      menu: {
        openMobileMenu: false,
        openMenuDown: false,
        bodyFreeze: false,
      },
      url: '',
      asdwww: false,
      search: false,
      window: {
        width: 0,
        height: 0,
      },
      logoMaxHeight: true,
      carts: [],
      priceTotal: 0,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$bus.$on('getcart', (status) => {
      this.getCart(status);
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.getCart();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getCart(status) { // 抓購物車資料
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data;
        this.priceTotal = 0;
        this.carts.forEach((item, index) => {
          this.carts[index].product.subtotal = item.product.price * item.quantity;
          this.priceTotal += item.product.price * item.quantity;
        });
        if (status === 'add') { // 新增 toast
          this.$toast.success('已加入購物車～');
        }
        if (status === 'edit') { // 修改 toast
          this.$toast.success('購物車數量已更新');
        }
        if (status === 'del') { // 刪除 toast
          this.$toast.success('商品移除成功');
        }
        if (status === 'success') { // 完成訂單 toast
          this.$toast.success('成功幫您建立訂單囉～');
        }
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        this.$toast.error(`取得購物車資料異常${error}`, { icon: 'fas fa-times' });
      });
    },
    clearStyle() { // 清除 Header 所有綁定狀態
      this.menu.openMobileMenu = false;
      this.menu.openMenuDown = false;
      this.menu.bodyFreeze = false;
      document.body.classList.remove('freeze');
    },
    mobileMenu() { // 手機漢堡條切換
      this.menu.openMobileMenu = !this.menu.openMobileMenu;
      this.menu.openMenuDown = !this.menu.openMenuDown;
      document.body.classList.toggle('freeze');
    },
    isSearch() { // 搜尋切換
      this.search = !this.search;
    },
    handleResize() { // 視窗偵測
      const { width } = this.window;
      const menu = this.menu.openMobileMenu;
      if (width < 768 && menu) {
        document.body.classList.add('freeze');
      } else {
        document.body.classList.remove('freeze');
      }
    },
    handleScroll() { // 滾動偵測切換 Logo 大小
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 50) {
        this.logoMaxHeight = false;
      } else {
        this.logoMaxHeight = true;
      }
    },
    openCart() {
      $('#cartModal').modal('show');
    },
  },
};

</script>

<style lang="scss">
</style>
