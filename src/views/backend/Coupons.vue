<template>
    <div class="container">
      <VueLoading loading :active.sync="isLoading"></VueLoading>
      <div class="text-right mt-5">
        <button class="btn btn-main" @click="openModal('new')">
          建立新的折價卷
        </button>
      </div>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th width="120">
              標題
            </th>
            <th width="120">
              折扣碼
            </th>
            <th width="120">
              折扣金額
            </th>
            <th width="120">
              到期時間
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coupons" :key="index">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.deadline.datetime }}</td>
            <td>
              <span v-if="item.enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-main btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Toasts></Toasts>

      <Pagination :pages="pagination" @previous="getCoupons"></Pagination>
      <!-- Modal -->
      <CouponsModal ref="couponsModal" :isNew="isNew" @update="getCoupons"></CouponsModal>
      <DelCouponsModal :tempCoupons="tempCoupons" @update="getCoupons"></DelCouponsModal>
    </div>
</template>
<script>
import $ from 'jquery';

import Toasts from '../../components/Toasts.vue';
import CouponsModal from '../../components/modal/CouponsModal.vue';
import DelCouponsModal from '../../components/modal/DelCouponsModal.vue';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    CouponsModal,
    DelCouponsModal,
    Toasts,
    Pagination,
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupons: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: '',
      },
      isNew: false,
      isLoading: false,
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(page = 1) {
      // GET api/{uuid}/admin/ec/coupons
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.coupons = res.data.data; // 取得產品列表
          this.pagination = res.data.meta.pagination; // 取得分頁資訊
          this.isLoading = false;
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

<style lang="scss" scoped>
  .table th, .table td {
    vertical-align: inherit;
  }
</style>
