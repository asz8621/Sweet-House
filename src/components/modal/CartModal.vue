<template>
  <div>
    <div class="cartModal modal fade modal-left" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header w-100 bg-white">
            <div class="d-flex justify-content-between align-items-center w-100">
              <span class="cart-icon px-4">
                <i class="fas fa-cart-arrow-down"></i>
              </span>
              <div>
                <div class="large-size text-center">購物清單</div>
                <div class="large-size">
                  <span>小計</span>
                  <span> $ {{priceTotal | thousands}}</span>
                </div>
              </div>
              <button type="button" class="close m-0" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" v-if="carts.length > 0">
            <div class="row" v-for="item in carts" :key="item.product.id">
              <div class="cart-item d-flex position-relative p-3 w-100">
                <div>
                  <img :src="item.product.imageUrl" alt="" class="cart-img img-fluid">
                  <div class="qty-counter d-flex">
                    <!-- - -->
                    <button type="button" data-btn="less" class="btn btn-compute less"
                      @click="item.quantity--,updateQuantity($event, item.product.id, item.quantity)"
                      :disabled="item.quantity <= 1 || btnLoading !== ''">
                    <div class="spinner-border spinner-border-sm m-auto" role="status"
                      v-if="btnLoading === item.product.id && btnStatus === 'less'">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <i class="fas fa-minus" v-else></i>
                    </button>
                    <!-- input -->
                    <input type="number" data-btn="input"
                      class="text-center qty-num" min="1" max="99" value="1"
                      v-model.number="item.quantity"
                      @change="updateQuantity($event, item.product.id,item.quantity)"
                      :disabled="btnStatus !== '' || btnStatus === 'input'">
                      <div class="spinner-border spinner-border-sm m-auto qty-loading" role="status"
                        v-if="btnLoading === item.product.id && btnStatus === 'input'">
                        <span class="sr-only">Loading...</span>
                      </div>
                    <!-- + -->
                    <button type="button" data-btn="plus" class="btn btn-compute plus"
                      @click="item.quantity++,updateQuantity($event, item.product.id,item.quantity)"
                      :disabled="btnLoading !== '' ">
                      <div class="spinner-border spinner-border-sm m-auto" role="status"
                        v-if="btnLoading === item.product.id && btnStatus === 'plus'">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <i class="fas fa-plus" v-else></i>
                    </button>
                  </div>
                </div>
                <div class="w-100">
                  <h4 class="m-3">{{item.product.title}}</h4>
                  <div class="subtitle m-3">{{item.product.unit}}</div>
                  <div class="price-text text-right">
                    <span>NT $ </span>
                    <span>{{item.product.subtotal}}</span>
                  </div>
                </div>
                <!-- del -->
                <button type="button" data-btn="del"
                class="btn btn-outline-main del-btn d-flex align-items-center justify-content-center"
                @click.prevent="delProduct($event, item.product.id, item.product)"
                :disabled="btnLoading !== '' ">
                  <div class="spinner-border spinner-border-sm m-auto" role="status"
                  v-if="btnLoading === item.product.id && btnStatus === 'del'">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <i class="far fa-trash-alt" v-else></i>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-body" v-else>
            <div class="d-flex justify-content-center align-items-center h-100">目前購物車沒有任何商品</div>
          </div>
          <div class="modal-footer w-100 bg-white">
            <button type="button" class="large-size btn btn-main w-100" disabled="disabled">立即結帳</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['carts', 'priceTotal'],
  data() {
    return {
      btnLoading: '',
      tenpQuantity: 0, // 防止錯誤訊息
      errorQty: false, // 判斷數量錯誤 disabled
      btnStatus: '', // data-btn 暫存值
    };
  },
  methods: {
    checkout() {
      if (this.$route.path !== '/checkout') {
        this.$router.push('/checkout');
      }
      $('#cartModal').modal('hide');
    },
    updateQuantity(e, id, quantity) { // 購物車數量更新
      const dataset = e.currentTarget.dataset.btn;
      this.btnLoading = id;
      this.tenpQuantity = quantity;
      this.errorQty = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };

      // 各別按鈕 loading
      switch (dataset) {
        case 'less':
          this.btnStatus = dataset;
          break;
        case 'plus':
          this.btnStatus = dataset;
          break;
        case 'input':
          this.btnStatus = dataset;
          break;
        default:
      }

      // 數量異常關閉結帳
      const IntegerRule = /^[1-9]+[0-9]*]*$/; // 驗證正整數
      if (!IntegerRule.test(cart.quantity)) {
        this.$toast.error('數量錯誤');
        this.btnLoading = '';
        this.btnStatus = ''; // 清空 data-btn 暫存值
        this.errorQty = true;
        return;
      }

      // 數量正常才更新
      this.$http.patch(api, cart).then(() => {
        this.btnLoading = '';
        this.btnStatus = ''; // 清空 data-btn 暫存值
        this.errorQty = false;
        this.$bus.$emit('getcart', 'edit');
      }).catch((error) => {
        // 禁止數量錯誤訊息(quantity 並沒有任何更改。)
        if (cart.quantity === this.tenpQuantity) {
          this.btnLoading = '';
          this.btnStatus = ''; // 清空 data-btn 暫存值
          this.errorQty = false;
          this.$toast.success('數量更新正確');
          return;
        }
        this.$toast.error(`${error.response.data.errors}`);
        this.btnLoading = '';
        this.btnStatus = ''; // 清空 data-btn 暫存值
      });
    },
    delProduct(e, id, data) {
      this.btnStatus = e.currentTarget.dataset.btn;
      this.btnLoading = id;
      // DELETE api/{uuid}/ec/shopping/{pid}
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(api, data).then(() => {
        this.$bus.$emit('getcart', 'del');
        this.btnLoading = '';
        this.btnStatus = '';
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        this.$toast.error(`${error.response.data.errors}`, { icon: 'fas fa-times' });
        this.btnLoading = '';
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
