<template>
  <div class="container mb-5">
    <VueLoading loading :active.sync="isLoading">
      <loading></loading>
    </VueLoading>
    <table class="table mt-5 text-center">
      <thead>
        <tr>
          <th width="250">
            下單時間
          </th>
          <th width="100">
            付款方式
          </th>
          <th>
            訂購產品
          </th>
          <th width="100">
            是否付款
          </th>
          <th width="150">
            總金額
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in oders" :key="item.id">
          <td>{{ item.created.datetime }}</td>
          <td>{{ item.payment }}</td>
          <td>
            <ul>
              <li class="cursor-pointer" @click="openModal(item,'show')">
                {{ item.products[0].product.title }} X {{ item.products[0].quantity }}
                <span class="badge badge-pill badge-info ml-1"
                v-if="item.products.length !== 1">{{item.products.length}}</span>
              </li>
            </ul>
          </td>
          <td>
            <span v-if="item.paid" class="text-success">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td>NT$ {{ item.amount | thousands }}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-main btn-sm" @click="openModal(item)">
                查看
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @previous="getOrder"></Pagination>

    <!-- Modal -->
    <OrderModal ref="orderModal" @update="getOrder"></OrderModal>
  </div>
</template>
<script>
// import $ from 'jquery';

import OrderModal from '../../components/modal/OrderModal.vue';
import Pagination from '../../components/Pagination.vue';
import loading from '../../components/backendLoading.vue';

export default {
  components: {
    OrderModal,
    Pagination,
    loading,
  },
  data() {
    return {
      pagination: {},
      oders: [],
      isNew: false,
      isLoading: false,
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      // GET api/{uuid}/admin/ec/orders
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders`;
      this.$http.get(api)
        .then((res) => {
          this.oders = res.data.data;
          this.pagination = res.data.meta.pagination; // 取得分頁資訊
          this.isLoading = false;

          this.oders.forEach((item, index) => {
            switch (item.payment) {
              case 'ATM':
                this.oders[index].payment = '貨到付款';
                break;
              case 'WebATM':
                this.oders[index].payment = '銀行轉帳';
                break;
              case 'Credit':
                this.oders[index].payment = '信用卡';
                break;
              default:
            }
          });
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '讀取錯誤',
            text: '資料讀取異常，請洽資訊人員',
          });
        });
    },
    openModal(item, show) {
      this.$refs.orderModal.getOrder(item.id, show);
    },
  },
};
</script>
<style lang="scss">
</style>
