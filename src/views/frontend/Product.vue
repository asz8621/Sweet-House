<template>
  <div class="content">
    <VueLoading loading :active.sync="status.isLoading">
      <loading></loading>
    </VueLoading>
    <div class="container py-5">
      <Breadcrumb :productTitle="product.title"></Breadcrumb>
      <div class="row pb-md-5">
        <div class="col-md-6 col-lg-5 mb-4">
          <img :src="product.imageUrl" alt="" class="img-fluid mb-2">
        </div>
        <div class="col-md-6 col-lg-7 mb-4">
          <div class="product">
            <h1 class="product-title">{{ product.title }}</h1>
            <!-- 建議售價 -->
            <div class="price">
              <div class="small-text mb-1">建議售價</div>
              <template v-if="product.price !== product.origin_price">
                <span class="onSale mr-2">NT$ {{ product.price }}</span>
                <span class="original">NT$ {{ product.origin_price }}</span>
              </template>
              <template v-else>
                <span class="onSale mr-2">NT$ {{ product.price }}</span>
              </template>
            </div>

            <!-- 商品規格 -->
            <div class="format">
              <div class="small-text mb-1">規格</div>
              <div class="d-flex">
                <span class="format-text">{{product.unit}}</span>
              </div>
            </div>

            <!-- 商品數量 -->
            <div class="qty">
              <div class="small-text mb-1">數量</div>
                <div class="qty-counter d-flex">
                  <button type="button" class="btn btn-compute less" @click="quantity--" :disabled="quantity === 1"><i class="fas fa-minus"></i></button>
                  <input type="number" class="text-center qty-num" min="1" max="99" value="1" v-model.number="quantity" @change="verifyQuantity">
                  <button type="button" class="btn btn-compute plus" @click="quantity++"><i class="fas fa-plus"></i></button>
                </div>
                <div class="features-btn-group">
                  <button type="button"
                  class="addcart large-size btn btn-outline-main w-100 mr-3"
                  @click.prevent="addCart(product.id, quantity, 'add')"
                  :disabled="quantity < 1 || status.btnLoading !== ''">
                    加入購物車
                    <div class="spinner-border spinner-border-sm ml-2"
                      role="status" v-if="status.btnLoading === product.id && !status.isBuy">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                  <button type="button" class="buycart large-size btn btn-main w-100"
                  @click.prevent="addCart(product.id, quantity, 'buy'),status.isBuy=!status.isBuy"
                  :disabled="quantity < 1 || status.btnLoading !== ''">
                    立即購買
                    <div class="spinner-border spinner-border-sm ml-2"
                      role="status" v-if="status.btnLoading === product.id && status.isBuy">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                </div>
            </div>

          </div>

        </div>
      </div>

      <div class="row">
        <div class="col">
          <ul class="product-tab-menu mb-3" id="tab-menu">
            <li class="product-tab-item"
            :class="{'active':tab==='tab1'}"
            @click="tab = 'tab1'">
              <span class="product-tab-link cursor-pointer p-3">商品介紹</span>
            </li>
            <li class="product-tab-item"
            :class="{'active':tab==='tab2'}"
            @click="tab = 'tab2'">
              <span class="product-tab-link cursor-pointer p-3">規格說明</span>
            </li>
            <li class="product-tab-item"
            :class="{'active':tab==='tab3'}"
            @click="tab = 'tab3'">
              <span class="product-tab-link cursor-pointer p-3">訂購需知</span>
            </li>
          </ul>
          <ul class="product-tab-description" id="tab-content">
            <transition name="fade-tab" mode="out-in">
              <li class="product-tab-content" v-html="product.content"
              v-if="tab === 'tab1'" key="tab1"></li>
              <li class="product-tab-content" v-html="product.description"
              v-if="tab === 'tab2'" key="tab2"></li>
              <li class="product-tab-content"
              v-if="tab === 'tab3'" key="tab3">
              <div class="delivery p-3">
                <div class="delivery-title text-danger pb-3">蛋糕相關商品下單前請您務必詳讀以下兩點：</div>
                <ol class="mb-6">
                  <li class="mb-3">運送過程有可能造成蛋糕上的食材位移或毀損，但宅配方與我方並不賠償蛋糕運送途中所造成的毀損，所以請您評估宅配相關風險後再訂購。我們還是建議門市自取的方式，也不用另外支付運費喔！</li>
                  <li class="mb-3">新鮮水果類，擺放時會因大小而造成顆數有所不同，與商品照片有落差，以實際出貨商品為主，然而運送過程，有可能造成蛋糕位移或毀損情形，煩請評估宅配相關風險再訂購，避免爭議發生。</li>
                </ol>
                <div class="delivery-title text-danger pb-3">【訂購需知】</div>
                <ol>
                  <li class="mb-3">出貨方式：自取或低溫宅配寄出，收到時請放冷藏回溫後再食用。</li>
                  <li class="mb-3">保存方式：
                    <ul>
                      <li>蛋糕相關商品冷藏保存二至三天，建議盡早食用完畢，以保最佳風味。</li>
                      <li>其餘商品建議二至三天食用完畢，以保最佳風味。</li>
                    </ul>
                  </li>
                  <li class="mb-3">食品因保存期限及衛生考量，恕不適用七天鑑賞期。</li>
                  <li class="mb-3">付款後若需更動訂單（如：改期、取消或調整數量），請於取貨日前三日告知。</li>
                </ol>
              </div>
            </li>
            </transition>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loading from '../../components/Loading.vue';
import Breadcrumb from '../../components/Breadcrumb.vue';

export default {
  components: {
    loading,
    Breadcrumb,
  },
  props: ['carts'],
  data() {
    return {
      product: {
        options: {
          format: [],
        },
      },
      quantity: 1,
      status: {
        isLoading: false,
        btnLoading: '',
        isBuy: false,
      },
      tab: 'tab1', // tab 標籤預設
    };
  },
  created() {
    this.status.isLoading = true;
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() { // 讀取所有商品資料
      this.status.isLoading = true;
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api)
        .then((res) => {
          this.product = res.data.data;
          this.status.isLoading = false;
        })
        .catch(() => {
          this.status.isLoading = false;
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
    },
    verifyQuantity() { // 驗證數量
      const IntegerRule = /^[1-9]+[0-9]*]*$/; // 整數規則
      if (this.quantity < 1 || !IntegerRule.test(this.quantity)) {
        this.quantity = 1;
      }
    },
    addCart(id, quantity = 1, btn) { // 加入購物車 && 立即購買
      // PATCH api/{uuid}/ec/shopping
      let statusBtn = btn; // 預設 add
      this.status.btnLoading = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      let httpMethod = 'post';
      let qty = quantity; // 數量

      // 購物車有一樣的商品
      const mapData = this.carts.filter((item) => id === item.product.id);
      if (mapData.length > 0) {
        httpMethod = 'patch';
        qty += mapData[0].quantity;
        statusBtn = 'edit';
      }
      // 建立數據
      const cart = {
        product: id,
        quantity: qty,
      };
      this.$http[httpMethod](api, cart).then(() => {
        if (btn === 'add') {
          this.$bus.$emit('getcart', statusBtn);
          this.status.btnLoading = '';
        }
        if (btn === 'buy') {
          this.$bus.$emit('getcart');
          this.status.btnLoading = '';
          this.$router.push('/checkout');
        }
      }).catch((errors) => {
        this.$toast.error(`${errors.response.data.errors}`, { icon: 'far fa-times-circle' });
        this.status.btnLoading = '';
      });
    },
  },
};
</script>
<style lang="scss">
.fade-tab-enter-active, .fade-tab-leave-active {
  transition: opacity .25s;
}
.fade-tab-enter, .fade-tab-leave-to{
  opacity: 0;
}

</style>
