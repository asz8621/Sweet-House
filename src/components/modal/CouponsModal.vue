<template>
  <div>
    <VueLoading loading :active.sync="isLoading">
      <loading></loading>
    </VueLoading>
    <div id="couponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="form-group">
              <label for="title">活動標題</label>
              <input id="title" v-model="tempCoupon.title" type="text"
              class="form-control" placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">折扣碼</label>
              <input id="title" v-model="tempCoupon.code" type="text"
              class="form-control" placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">折扣價錢</label>
              <input id="title" v-model="tempCoupon.percent" type="text"
              class="form-control" placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="deadlineDate">到期日</label>
              <input type="date" class="form-control" id="deadlineDate" v-model="deadlineDate" placeholder="請輸入到期日">
            </div>
            <div class="form-group">
              <label for="deadlineTime">到期時間</label>
              <input type="time" class="form-control" id="deadlineTime" step="1" v-model="deadlineTime" placeholder="請輸入到期時間">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-main" @click="updateCoupons">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import loading from '../backendLoading.vue';

export default {
  props: ['isNew'],
  components: {
    loading,
  },
  data() {
    return {
      tempCoupon: {},
      deadlineDate: '',
      deadlineTime: '',
      isLoading: false,
    };
  },
  methods: {
    getCoupon(id, type) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
      switch (type) {
        case 'new':
          this.tempCoupon = {
            title: '',
            code: '',
            percent: 100,
            enabled: false,
            deadline_at: '',
          };
          this.isLoading = false;
          break;
        default:
          this.$http.get(api).then((res) => {
            this.isLoading = false;
            // 取得成功後回寫到 tempCoupon
            this.tempCoupon = res.data.data;
            const deadline = this.tempCoupon.deadline.datetime.split(' ');
            [this.deadlineDate, this.deadlineTime] = deadline;
            // 確保資料已經回寫後在打開 Modal
            $('#couponModal').modal('show');
          }).catch(() => {
            this.$swal({
              icon: 'error',
              title: '讀取錯誤',
              text: '資料讀取異常，請洽資訊人員',
            });
            this.isLoading = false;
          });
          break;
      }
    },
    updateCoupons() {
      // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        httpMethod = 'patch';
      }
      this.tempCoupon.deadline_at = `${this.deadlineDate} ${this.deadlineTime}`;
      this.$http[httpMethod](api, this.tempCoupon).then(() => {
        this.$emit('update');
        this.deadlineDate = '';
        this.deadlineTime = '';
        $('#couponModal').modal('hide'); // AJAX 新增成功後關閉 Modal
      }).catch(() => {
        this.$swal({
          icon: 'error',
          title: '讀取錯誤',
          text: '資料讀取異常，請洽資訊人員',
        });
      });
    },
  },
};
</script>
