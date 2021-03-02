<template>
  <div id="delCouponsModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>刪除折價卷</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempCoupons.title }}</strong> 折價卷(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delCoupons">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'DelCouponsModal',
  props: ['tempCoupons'],
  data() {
    return {
    };
  },
  methods: {
    delCoupons() {
      // DELETE api/{uuid}/admin/ec/coupon/{id}
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupons.id}`;
      this.$http.delete(api).then(() => {
        $('#delCouponsModal').modal('hide'); // 刪除成功後關閉 Modal
        this.$emit('update');
      });
    },
  },
};
</script>
<style lang="scss">

</style>
