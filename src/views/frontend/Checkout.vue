<template>
  <div id="checkout" class="checkout content" :class="{'complete-all':form.complete}">
    <!-- <template v-if="del">
      <VueLoading loading :active.sync="status.isLoading"></VueLoading>
    </template> -->
    <!-- <template v-else> -->
      <VueLoading loading :active.sync="status.isLoading">
        <loading></loading>
      </VueLoading>
    <!-- </template> -->
    <div class="checkout-content container py-5">

      <section class="process d-flex mb-6">
        <div class="process-block text-center">
          <div class="process-no finish p-4">
            <span class="process-no-round">1</span>
          </div>
          <div>購物清單</div>
        </div>
        <div class="process-block text-center">
          <div class="process-no p-4" :class="{'finish':processStart}">
            <span class="process-no-round">2</span>
          </div>
          <div>填寫資料</div>
        </div>
        <div class="process-block text-center">
          <div class="process-no p-4" :class="{'finish':processStart && form.complete}">
            <span class="process-no-round">3</span>
          </div>
          <div>完成訂單</div>
        </div>
      </section>

      <section class="order mb-6">
        <transition name="order-fade" mode="out-in">
          <!-- 1 -->
          <div class="order-list" v-if="!processStart" key="cutover1">
            <!-- 1-購物清單 -->
            <div class="order-product mb-4">
              <h5 class="order-title p-3 m-0" @click.prevent="rotate = !rotate">
                購物清單
                <span class="order-title-num">{{this.carts.length}}</span>
                <span class="order-collapse" :class="{'rotate':rotate}"  v-if="this.carts.length > 0">
                  <i class="fas fa-chevron-down"></i>
                </span>
              </h5>
              <transition name="fade">
                <!-- <div v-if="this.carts.length < 1"></div> -->
                <template v-if="this.carts.length > 0">
                  <div v-if="rotate">
                    <div class="p-3 d-none d-lg-block">
                      <span class="table-col-1 table-space text-center d-inline-block">圖片</span>
                      <span class="table-col-2 table-space text-center d-inline-block">產品名稱</span>
                      <span class="table-col-3 table-space text-center d-inline-block">規格</span>
                      <span class="table-col-4 table-space text-center d-inline-block">單價</span>
                      <span class="table-col-5 table-space text-center d-inline-block">數量</span>
                      <span class="table-col-6 table-space text-center d-inline-block">單品總價</span>
                    </div>

                    <div class="shoppinglist p-3"
                      v-for="item in carts" :key="`${item.product.id}ch`">
                      <div class="shoppinglist-item">
                        <div class="contents mb-3 mb-lg-0">
                          <div class="table-col-1 table-space">
                            <img :src="item.product.imageUrl" alt="" class="img-fluid">
                          </div>
                          <div class="contents-text">
                            <h5 class="contents-text-title table-col-2 table-space">{{ item.product.title }}</h5>
                            <div class="contents-text-spec table-col-3 table-space">
                              <span class="d-lg-none">規格：</span>{{ item.product.unit }}
                            </div>
                            <div class="contents-text-price table-col-4 table-space">
                              <span class="d-lg-none">單價：</span><span class="dollar">$</span>{{item.product.price}}
                            </div>
                          </div>
                        </div>
                        <div class="operating mb-3 mb-lg-0">
                          <div class="operating-qty table-col-5 table-space d-flex">
                            <!-- - -->
                            <button type="button" data-btn="less" class="operating-less btn"
                              @click="item.quantity--,updateQuantity($event, item.product.id, item.quantity)"
                              :disabled="item.quantity <= 1 || status.btnLoading !== ''">
                              <div class="d-flex justify-content-center"
                              v-if="status.btnLoading === item.product.id && status.btnStatus === 'less'">
                                <div class="spinner-border spinner-border-sm" role="status">
                                  <span class="sr-only">Loading...</span>
                                </div>
                              </div>
                              <i class="fas fa-minus" v-else></i>
                            </button>
                            <!-- input -->
                            <input type="number" data-btn="input"
                              class="operating-inputqty text-main text-center" min="1"
                              v-model.number="item.quantity"
                              @change="updateQuantity($event, item.product.id,item.quantity)"
                              :disabled="status.btnLoading !== '' || status.btnStatus === 'input'">
                              <div class="spinner-border spinner-border-sm qty-loading" role="status"
                              v-if="status.btnLoading === item.product.id && status.btnStatus === 'input'">
                                <span class="sr-only">Loading...</span>
                              </div>
                            <!-- + -->
                            <button type="button" data-btn="plus" class="operating-plus btn"
                              @click="item.quantity++,updateQuantity($event, item.product.id,item.quantity)"
                              :disabled="status.btnLoading !== ''">
                              <div class="d-flex justify-content-center"
                              v-if="status.btnLoading === item.product.id && status.btnStatus === 'plus'">
                                <div class="spinner-border spinner-border-sm" role="status">
                                  <span class="sr-only">Loading...</span>
                                </div>
                              </div>
                              <i class="fas fa-plus" v-else></i>
                            </button>
                          </div>
                          <div class="price-total text-right table-col-6 table-space d-none d-lg-block">
                            <span class="dollar">$</span>{{item.product.priceTotal}}
                          </div>
                          <!-- del -->
                          <button type="button" data-btn="del"
                            class="btn btn-outline-main d-flex align-items-center justify-content-center operating-del"
                            @click.prevent="delProduct($event, item.product.id, item.product)"
                            :disabled="status.btnLoading !== ''">
                            <div class="d-flex justify-content-center"
                              v-if="status.btnLoading === item.product.id && status.btnStatus === 'del'">
                              <div class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                            <i class="far fa-trash-alt" v-else></i>
                          </button>
                        </div>
                      </div>
                      <div class="price-total text-right d-block d-lg-none">
                        <span>小計：</span><span class="dollar">$</span>{{item.product.priceTotal}}
                      </div>
                    </div>
                  </div>
                </template>
                <div class="text-center p-3" v-else>請點擊 選購商品 挑選您喜歡的商品在進行結帳</div>
              </transition>
            </div>

            <!-- 1-訂單資訊 -->
            <div class="order-info mb-4">
              <h5 class="order-title p-3 m-0">訂單資訊</h5>
              <div class="order-num text-right p-3 d-none d-sm-block"
              v-if="this.carts.length > 0">
                <span>總共 {{this.carts.length}} 件商品</span>
              </div>
              <div class="cost p-3" v-if="this.carts.length > 0">
                <div class="cost-discount py-3 p-md-3">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control border-main" placeholder="請輸入折扣碼"
                      aria-label="請輸入折扣碼" aria-describedby="請輸入折扣碼" v-model="form.coupons.discountKey" :disabled="form.coupons.success || form.coupons.click">
                    <div class="input-group-append">
                      <button class="btn btn-outline-main d-flex justify-content-center align-items-center"
                      type="button" id="button-addon2"
                      @click="useCoupon" :disabled="form.coupons.success || form.coupons.click">
                        確定
                        <!-- <div class="ml-2"> -->
                          <div class="spinner-border spinner-border-sm ml-2" role="status"
                          v-if="form.coupons.click">
                            <span class="sr-only">Loading...</span>
                          </div>
                        <!-- </div> -->
                      </button>
                    </div>
                  </div>
                  <div v-if="form.coupons.success">
                  <!-- <div> -->
                    <span class="text-small pr-3">
                      已使用
                      <span class="text-danger">{{form.coupons.tenpCoupon.title}}</span>
                      折價卷，此次折扣
                      <span class="text-danger">{{form.coupons.tenpCoupon.percent}}</span>
                      元
                    </span>
                    <button type="button" class="btn btn-sm btn-secondary" @click="cancelCoupon">取消</button>
                  </div>
                </div>

                <div class="order-num text-right d-sm-none py-3">總共 {{this.carts.length}} 件商品</div>

                <ul class="cost-count py-3">
                  <li class="cost-item">
                    <span class="cost-item-title">商品總金額：</span>
                    <span class="cost-item-price"><span>+</span>$ {{this.priceTotal | thousands}}</span>
                  </li>
                  <li class="cost-item">
                    <span class="cost-item-title">折扣碼：</span>
                    <span class="cost-item-price"><span>-</span>$ {{this.discount | thousands}}</span>
                  </li>
                  <li class="cost-item">
                    <span class="cost-item-title">運費：</span>
                    <span class="cost-item-price"><span>+</span>$ {{this.shippingFee | thousands}}</span>
                  </li>
                  <li class="cost-item">
                    <hr>
                    <span class="cost-item-title">應付總和：</span>
                    <span class="cost-item-price">NT $ {{AllTotal | thousands}}</span>
                  </li>
                </ul>

              </div>
            </div>

            <!-- 1-btn -->
            <div class="cost-btn-group text-center p-3 p-sm-0 w-100" v-if="!processStart">
              <button type="button" class="cost-btn-back large-size btn btn-outline-main"
              @click="$router.push('products')">選購商品</button>
              <button type="button" class="cost-btn-confirm large-size btn btn-main"
              @click.prevent="checkOrder"
              :disabled="errorQty || form.coupons.click || carts.length < 1 || status.btnStatus==='del'">確認訂單</button>
            </div>

          </div>

          <!-- 2 -->
          <div class="information" v-else-if="processStart && !form.complete" key="cutover2">
            <ValidationObserver tag="div" v-slot="{ invalid }">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider rules="required" v-slot="{ errors, classes }">
                      <label for="name">姓名</label>
                      <input type="text" class="form-control" :class="classes"
                      id="name" name="姓名" placeholder="請輸入姓名" v-model="form.name">
                      <span class="invalid-feedback">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-6">
                    <ValidationProvider rules="required|integer|min:8|numeric" v-slot="{ errors, classes }">
                      <label for="phone">電話</label>
                      <input type="tel" class="form-control" :class="classes"
                      id="phone" name="電話" placeholder="請輸入電話" v-model="form.tel">
                      <span class="invalid-feedback">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                    <label for="email">信箱</label>
                    <input type="email" class="form-control" :class="classes"
                    id="email" name="信箱" placeholder="請輸入信箱" v-model="form.email">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="address">收件地址</label>
                    <input type="text" class="form-control"  :class="classes"
                    id="address" name="收件地址" placeholder="請輸入收件地址" v-model="form.address">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <hr>

                <label for="address">付款方式</label>
                <div class="form-group">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline1"
                    class="custom-control-input" name="customRadioInline1"
                    value="ATM" v-model="form.payments.paymentMethod"
                    @click="creditCardSwitch('delivery')" checked>
                    <label class="custom-control-label" for="customRadioInline1" selected>貨到付款</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2"
                    class="custom-control-input" name="customRadioInline1"
                    value="Credit" @click="creditCardSwitch('creditCard')"
                    v-model="form.payments.paymentMethod">
                    <label class="custom-control-label" for="customRadioInline2">信用卡結帳</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline3"
                    class="custom-control-input" name="customRadioInline1"
                    value="WebATM" @click="creditCardSwitch('transfer')"
                    v-model="form.payments.paymentMethod">
                    <label class="custom-control-label" for="customRadioInline3">銀行轉帳</label>
                  </div>
                </div>

                <!-- 貨到付款 -->
                <!-- <div class="delivery" v-if="form.payments.delivery.status">
                  delivery
                </div> -->

                <!-- 信用卡 -->
                <div class="credit-card form-group" v-if="form.payments.creditCard.status">
                  <div class="form-group">
                    <label for="credit-card-number">信用卡號<img class="ml-2" src="../../assets/images/creditCard_sprites.png" alt=""></label>
                      <div class="credit-card-number-group form-row align-items-center">
                        <ValidationProvider tag="div" class="col col-md-2" rules="required|integer|min:4|numeric" v-slot="{ classes }">
                          <input type="tel" size="4" maxlength="4" class="creditCardNumber form-control" :class="classes" placeholder="XXXX" id="creditCardNumber1"
                          @keyup="cardNum(form.payments.creditCard.cardNumber1,'creditCardNumber1')" v-model.trim="form.payments.creditCard.cardNumber1">
                        </ValidationProvider>
                        -
                        <ValidationProvider tag="div" class="col col-md-2" rules="required|integer|min:4|numeric" v-slot="{ classes }">
                          <input type="tel" size="4" maxlength="4" class="creditCardNumber form-control" :class="classes" placeholder="XXXX" id="creditCardNumber2"
                          @keyup="cardNum(form.payments.creditCard.cardNumber2,'creditCardNumber2')" v-model.trim="form.payments.creditCard.cardNumber2">
                        </ValidationProvider>
                        -
                        <ValidationProvider tag="div" class="col col-md-2" rules="required|integer|min:4|numeric" v-slot="{ classes }">
                          <input type="tel" size="4" maxlength="4" class="creditCardNumber form-control" :class="classes" placeholder="XXXX" id="creditCardNumber3"
                          @keyup="cardNum(form.payments.creditCard.cardNumber3,'creditCardNumber3')" v-model.trim="form.payments.creditCard.cardNumber3">
                        </ValidationProvider>
                        -
                        <ValidationProvider tag="div" class="col col-md-2" rules="required|integer|min:4|numeric" v-slot="{ classes }">
                          <input type="tel" size="4" maxlength="4" class="creditCardNumber form-control" :class="classes" placeholder="XXXX" id="creditCardNumber4"
                          @keyup="cardNum(form.payments.creditCard.cardNumber4,'creditCardNumber4')"
                            v-model.trim="form.payments.creditCard.cardNumber4">
                        </ValidationProvider>
                      </div>
                  </div>
                  <div class="form-group">
                    <label for="monthYear">有效月年</label>
                    <div class="form-row align-items-center">
                      <ValidationProvider tag="div" class="col col-md-3" rules="excluded:請選擇月份" v-slot="{ classes }">
                        <select id="monthYear" class="creditCardSelect form-control" :class="classes"
                          v-model="form.payments.creditCard.cardMonth">
                          <option value="請選擇月份" selected disabled>請選擇月份</option>
                          <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                        </select>
                      </ValidationProvider>
                      月 ／
                      <ValidationProvider tag="div" class="col col-md-3" rules="excluded:請選擇年份" v-slot="{ classes }">
                        <select id="monthYear1" class="creditCardSelect form-control" :class="classes"
                          v-model="form.payments.creditCard.cardYear">
                          <option value="請選擇年份" selected disabled>請選擇年份</option>
                          <option v-for="item in form.payments.creditCard.yearArr[0]" :key="item" :value="item">{{ item }}</option>
                        </select>
                      </ValidationProvider>
                      年
                    </div>
                  </div>
                  <ValidationProvider tag="div" class="form-group" rules="required|integer|min:3|numeric" v-slot="{ classes }">
                    <label for="threeCodes">背面末三碼<img class="rounded ml-2" src="../../assets/images/threeCodes.png" alt=""></label>
                    <input type="tel" size="3" maxlength="3" id="threeCodes"
                    class="threeCodes form-control" placeholder="888" :class="classes"
                    @keyup="cardNum(form.payments.creditCard.cardNumber3,'threeCodes')"
                    v-model="form.payments.creditCard.cardThreeCodes">
                  </ValidationProvider>
                </div>
                <!-- 銀行轉帳 -->
                <div class="transfer form-group" v-if="form.payments.transfer.status">
                  <h5>銀行轉帳付款指示</h5>
                  <div class="border p-4">
                    <p>銀行：台新銀行</p>
                    <p>帳戶：1234-5678-9108-88</p>
                    <p>收款人：張先生</p>
                    <p class="transfer-remind">小提醒：<br>
                      <span>請於三天內進行匯款，否則系統會自動取消訂單，匯款成功後需等待 1 ~ 2 個工作天(不含假日)，我們確認金額無誤後會傳簡訊及信件告知訂單成立。</span>
                    </p>
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="order-remarks">訂單備註</label>
                  <textarea id="order-remarks" class="form-control" rows="3"
                  placeholder="有任何訂單需求都可在此留言，我們會盡量滿足您的要求"
                  v-model="form.message"></textarea>
                </div>

                <div class="form-group">
                  <ValidationProvider tag="div" class="form-check" :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
                    <input class="form-check-input" type="checkbox" id="gridCheck" v-model="form.provisions">
                    <label class="form-check-label" for="gridCheck">
                      已閱讀相關購物需知<a href="javastript:;" data-toggle="modal" data-target="#exampleModal">相關條文</a>
                    </label>
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>

                <div class="cost-btn-group cost-btn-fillin text-center p-3 p-md-0 w-100">
                  <div class="mb-3">
                    <span class="cost-item-title">應付總和：</span>
                    <span class="cost-item-price">NT $ {{AllTotal | thousands}}</span>
                  </div>
                  <div class="cost-inside-btn-group">
                    <button type="button" class="cost-btn-back large-size btn btn-outline-main"
                    @click.prevent="processStart=!processStart">返回</button>
                    <button type="button" class="cost-btn-confirm large-size btn btn-main"
                    @click.prevent="sendOrder" :disabled="invalid">完成</button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- 3 -->
          <div class="complete" v-else key="cutover3">
            <p class="complete-text text-center">感謝您訂購弄甜屋商品，<br>我們將以最快的速度處理您的訂單。</p>
            <div class="d-flex justify-content-around mt-auto">
              <button type="button" class="btn-complete large-size btn btn-outline-main" @click="$router.push('/')">前往首頁</button>
              <button type="button" class="btn-complete large-size btn btn-main" @click="$router.push('products')">繼續購物</button>
            </div>
          </div>
        </transition>
      </section>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// import $ from 'jquery';

import loading from '../../components/Loading.vue';

export default {
  components: {
    loading,
  },
  props: {
    window: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      status: {
        isLoading: false, // 整個畫面 Loading
        btnLoading: '', // 綁定 id 判斷數量更新
        isdel: false, // 點擊刪除移除 Loading 效果
        btnStatus: '', // data-btn 暫存值
      },
      processStart: false, // 流程圖 style
      rotate: false, // 購物清單顯示 & 關閉
      carts: [], // 購物車暫存
      discount: 0, // 折扣
      shippingFee: 0, // 運費
      priceTotal: 0, // 商品小計
      tenpQuantity: 0, // 防止錯誤訊息
      errorQty: false, // 判斷數量錯誤 disabled
      form: {
        coupons: {
          click: false,
          success: false,
          discountKey: '', // 折扣碼
          tenpCoupon: [],
        },
        name: '',
        tel: '',
        email: '',
        address: '',
        message: '',
        coupon: '',
        payment: '',
        payments: {
          paymentMethod: '貨到付款', // 預設付款方式
          delivery: {
            status: true,
          },
          creditCard: {
            status: false,
            creditCardInput: '',
            cardNumber1: '',
            cardNumber2: '',
            cardNumber3: '',
            cardNumber4: '',
            cardMonth: '請選擇月份',
            cardYear: '請選擇年份',
            cardThreeCodes: '',
            yearArr: [],
          },
          transfer: {
            status: false,
          },
        },
        provisions: false,
        complete: false, // 完成按鈕
      },
    };
  },
  computed: {
    AllTotal() {
      return this.priceTotal + this.shippingFee - this.discount;
    },
  },
  created() {
    this.status.isLoading = true;
    this.getCart();
  },
  mounted() {
    this.selectYear();
  },
  methods: {
    checkOrder() {
      if (this.carts.length < 1) {
        this.processStart = false;
        this.$toast.error('購物清單沒有產品，請點 選購商品 選購商品');
        // alert('nonono');
        return;
      }
      this.processStart = !this.processStart;
    },
    updateQuantity(e, id, quantity) { // 購物車數量更新
      const dataset = e.currentTarget.dataset.btn;
      this.status.btnLoading = id;
      this.tenpQuantity = quantity;
      this.errorQty = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };

      // 各別 loading
      switch (dataset) {
        case 'less':
          this.status.btnStatus = dataset;
          break;
        case 'plus':
          this.status.btnStatus = dataset;
          break;
        case 'input':
          this.status.btnStatus = dataset;
          break;
        default:
      }

      // 數量異常關閉結帳
      const IntegerRule = /^[1-9]+[0-9]*]*$/; // 驗證正整數
      if (!IntegerRule.test(cart.quantity)) {
        this.$toast.error('數量錯誤');
        this.status.btnLoading = '';
        this.status.btnStatus = ''; // 清空 data-btn 暫存值
        this.errorQty = true;
        return;
      }

      // 數量正常才更新
      this.$http.patch(api, cart).then(() => {
        this.status.btnLoading = '';
        this.status.btnStatus = ''; // 清空 data-btn 暫存值
        this.errorQty = false;
        this.$bus.$emit('getcart', 'edit');
        this.priceTotal = 0;
        this.carts.forEach((item) => {
          this.$set(item.product, 'priceTotal', item.product.price * item.quantity);
          this.priceTotal += item.product.price * item.quantity;
        });
      }).catch((error) => {
        // 禁止數量錯誤訊息(quantity 並沒有任何更改。)
        if (cart.quantity === this.tenpQuantity) {
          this.status.btnLoading = '';
          this.status.btnStatus = ''; // 清空 data-btn 暫存值
          this.errorQty = false;
          this.$toast.success('數量更新正確');
          return;
        }
        this.$toast.error(`${error.response.data.errors}`);
        this.status.btnLoading = '';
        this.status.btnStatus = ''; // 清空 data-btn 暫存值
      });
    },
    getCart() { // 抓購物車資料
      if (!this.status.isdel) {
        this.status.isLoading = true;
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((res) => {
        this.status.isLoading = false;
        this.status.isdel = false;
        this.carts = res.data.data;
        this.priceTotal = 0;
        this.shippingFee = 250;
        this.carts.forEach((item) => {
          this.$set(item.product, 'priceTotal', item.product.price * item.quantity);
          this.priceTotal += item.product.price * item.quantity;
        });
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        this.$toast.error(`取得購物車資料異常${error}`, { icon: 'fas fa-times' });
      });
      // this.carts.product.priceTotalqq = 0;
    },
    delProduct(e, id, data) { // 刪除購物車資料
      this.status.btnStatus = e.currentTarget.dataset.btn;
      this.status.btnLoading = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(api, data).then(() => {
        this.$bus.$emit('getcart', 'del');
        this.status.isdel = true; // 關閉 Loading 效果
        this.getCart();
        this.status.btnLoading = '';
        this.status.btnStatus = '';
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        this.$toast.error(`${error.response.data.errors}`, { icon: 'fas fa-times' });
        this.status.btnLoading = '';
      });
    },
    useCoupon() { // 使用折價卷
      this.form.coupons.click = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http.post(api, { code: this.form.coupons.discountKey }).then((res) => {
        this.form.coupons.tenpCoupon = res.data.data;
        this.form.coupons.click = false;
        this.form.coupon = this.form.coupons.discountKey;
        // 折價卷時間戳
        const couponsTimestamp = this.form.coupons.tenpCoupon.deadline.timestamp;
        // 現在時間戳
        const dateTime = Date.now();
        const nowTimestamp = Math.floor(dateTime / 1000);
        // 判斷是否過期
        if (nowTimestamp > couponsTimestamp) {
          this.$toast.error('折扣碼已過期', { icon: 'far fa-times-circle' });
          this.form.coupons.success = false;
        } else {
          this.form.coupons.success = true;
          this.discount = this.form.coupons.tenpCoupon.percent;
          this.$toast.success('折扣碼使用成功');
        }
      }).catch(() => {
        this.form.coupons.click = false;
        this.form.coupons.success = false;
        this.$toast.error('折扣碼輸入錯誤', { icon: 'far fa-times-circle' });
      });
    },
    cancelCoupon() { // 取消折價卷
      this.form.coupons.success = false;
      this.form.coupons.discountKey = '';
      this.discount = 0;
    },
    creditCardSwitch(payments) { // 付款方式
      // console.log(paymentw);
      switch (payments) {
        case 'delivery':
          this.form.payments.delivery.status = true;
          this.form.payments.creditCard.status = false;
          this.form.payments.creditCard.cardNumber1 = '';
          this.form.payments.creditCard.cardNumber2 = '';
          this.form.payments.creditCard.cardNumber3 = '';
          this.form.payments.creditCard.cardNumber4 = '';
          this.form.payments.creditCard.cardMonth = '請選擇月份';
          this.form.payments.creditCard.cardYear = '請選擇年份';
          this.form.payments.creditCard.cardThreeCodes = '';
          this.form.payments.transfer.status = false;
          break;
        case 'creditCard':
          this.form.payments.delivery.status = false;
          this.form.payments.creditCard.status = true;
          this.form.payments.transfer.status = false;
          break;
        case 'transfer':
          this.form.payments.delivery.status = false;
          this.form.payments.creditCard.status = false;
          this.form.payments.creditCard.cardNumber1 = '';
          this.form.payments.creditCard.cardNumber2 = '';
          this.form.payments.creditCard.cardNumber3 = '';
          this.form.payments.creditCard.cardNumber4 = '';
          this.form.payments.creditCard.cardMonth = '請選擇月份';
          this.form.payments.creditCard.cardYear = '請選擇年份';
          this.form.payments.creditCard.cardThreeCodes = '';
          this.form.payments.transfer.status = true;
          break;
        default:
      }
    },
    cardNum(number, id) { // 信用卡欄位
      // 背面三碼
      if (id === 'threeCodes') {
        const currentlyId = document.getElementById(id); // 目前的 id
        if (!/^\d+$/.test(number)) {
          currentlyId.value = /^\d+/.exec(currentlyId.value);
        }
        return;
      }

      // 其餘信用卡判斷
      // 取 id 後面的數字
      const idMantissa = id.replace(/[^0-9]/ig, '');
      switch (idMantissa) {
        case '1':
          this.form.payments.creditCard.creditCardInput = 'creditCardNumber2';
          break;
        case '2':
          this.form.payments.creditCard.creditCardInput = 'creditCardNumber3';
          break;
        case '3':
          this.form.payments.creditCard.creditCardInput = 'creditCardNumber4';
          break;
        default:
      }
      const currentlyId = document.getElementById(id); // 目前的 id
      const nextId = document.getElementById(this.form.payments.creditCard.creditCardInput); // 下個 id

      // 刪除非數字
      if (!/^\d+$/.test(number)) {
        currentlyId.value = /^\d+/.exec(currentlyId.value);
      }
      // 當 input 長度大於 4 切換到下個 input
      if (currentlyId.value.length === 4) {
        nextId.focus();
      }
    },
    selectYear() { // 信用卡年份的選項
      const arr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
      const getDate = new Date();
      const year = getDate.getFullYear().toString().slice(2); // 2021 => 21
      arr.forEach((item, index) => {
        if (item === year) { // 取 arr 位置
          // 寫入 year ~ year + 15 的陣列到 yearArr
          this.form.payments.creditCard.yearArr.push(arr.slice(index, index + 15));
        }
      });
    },
    sendOrder() { // 送出訂單
      // POST api/{uuid}/ec/orders
      this.form.payment = this.form.payments.paymentMethod;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };
      this.$http.post(api, order).then(() => {
        this.form.complete = true;
        this.$bus.$emit('getcart', 'success');
      }).catch((errors) => {
        this.$toast.error(`${errors.response.data.errors}`, { icon: 'far fa-times-circle' });
      });
    },
  },
};
</script>
<style lang="scss">
</style>
