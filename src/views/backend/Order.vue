<template>
  <div class="container">
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
              <li v-for="(product, key) in item.products" :key="key">
                {{ product.product.title }} X {{ product.quantity }}
              </li>
            </ul>
          </td>
          <td>
            <span v-if="item.enabled" class="text-success">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td>NT$ {{ item.amount }}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-main btn-sm" @click="openModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                取消
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
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
      // GET api/{uuid}/admin/ec/orders
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders`;
      this.$http.get(api)
        .then((res) => {
          this.oders = res.data.data;
          console.log(res.data.data);
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '讀取錯誤',
            text: '資料讀取異常，請洽資訊人員',
          });
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          // 切換狀態為 true 代表新增
          this.isNew = true;
          // 新增之前必須先清除原有可能暫存的資料
          // this.$refs.couponsModal.tempCoupons = {};
          // 切換完畢並清空資料後開啟 Modal
          this.$refs.couponsModal.getCoupon(this.tempCoupons, isNew);
          $('#couponsModal').modal('show');
          break;
        case 'edit':
          this.isLoading = false;
          // 切換狀態為 false 代表編輯
          this.isNew = false;
          this.$refs.couponsModal.getCoupon(item.id, isNew);
          break;
        case 'delete':
          // 淺拷貝
          this.tempCoupons = { ...item };
          // 拷貝完畢後開啟 Modal
          $('#delCouponsModal').modal('show');
          break;
        default:
          break;
      }
    },
  },
};
</script>
