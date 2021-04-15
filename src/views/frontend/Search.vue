<template>
  <div class="content search-page">
    <div class="container py-5">
      <div class="row pb-md-5">
        <template v-if="searchProducts.length > 0">
          <div class="col-12 alert alert-primary">搜尋「{{this.$route.params.searchName}}」，總共有 {{searchProducts.length}} 項搜尋結果</div>
          <div class="col-6 col-md-3 mb-3" v-for="item in searchProducts" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <img :src="item.imageUrl[0]" alt="" class="img-fluid">
            </router-link>
            <h2 class="title my-3">{{item.title}}</h2>
            <div class="price mb-3 text-right">NT$ {{ item.price | thousands }}</div>
            <div class="single-features-btnw" :style="{'right': btnLoading === item.id ? '2px' : ''}">
              <button type="button" class="addcart large-size btn btn-main w-100" @click.prevent="addCart(item.id)" :disabled="btnLoading !== '' ">
                <span class="addcart-text1">加入購物車</span>
                <div class="spinner-border spinner-border-sm ml-2" role="status"
                v-if="btnLoading === item.id">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>
            </div>
          </div>
        </template>

        <template  v-else>
          <div class="col-12 alert alert-danger">
            <span>搜尋「{{this.$route.params.searchName}}」，找不到任何東西。</span><br/>
            <span>請使用其他的關鍵字再試一次，也可以前往 <router-link to="/products">所有產品</router-link> 來查看所有商品。</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['carts'],
  data() {
    return {
      searchProducts: {},
      btnLoading: '',
    };
  },
  created() {
    this.getProducts();
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) {
        this.getProducts();
      }
    },
  },
  methods: {
    getProducts() {
      const { searchName } = this.$route.params;
      if (!searchName) return; // 沒輸入不動作
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api)
        .then((res) => {
          this.searchProducts = res.data.data.filter((item) => item.title.match(searchName));
          console.log(this.searchProducts);
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$store.dispatch('updateLoading', false);
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
      this.searchName = '';
      this.search = false;
      this.$router.push(`/search/q=${searchName}`);
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
