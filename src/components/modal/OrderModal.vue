<template>
  <div>
    <VueLoading loading :active.sync="isLoading"></VueLoading>
    <div id="orderModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="table-btn">
              <span class="table-switch cursor-pointer p-3" :class="{'active':!detail}" @click="detail=false">訂單資訊</span>
              <span class="table-switch cursor-pointer p-3" :class="{'active':detail}" @click="detail=true">訂購項目</span>
            </div>
            <table class="table border" v-if="!detail">
              <tbody>
                <tr>
                  <th scope="row" width="120" class="text-right">建立時間：</th>
                  <td>{{order.updated.datetime}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">姓名：</th>
                  <td>{{order.user.name}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">信箱：</th>
                  <td>{{order.user.email}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">電話：</th>
                  <td>{{order.user.tel}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">地址：</th>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">折價劵：</th>
                  <td v-if="order.coupon">{{`${order.coupon.title} - [ 折扣金額 ${order.coupon.percent} 元 ]`}}</td>
                  <td v-else>無</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">付款方式：</th>
                  <td>{{payment}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">總金額：</th>
                  <td>{{order.amount}}</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">備註：</th>
                  <td v-if="order.message">{{order.message}}</td>
                  <td v-else>無</td>
                </tr>
                <tr>
                  <th scope="row" width="120" class="text-right">是否付款：</th>
                  <td>
                    <label class="m-0">
                      <input type="checkbox" name="" id="" class="paid" v-model="order.paid">
                      <span class="btn-switch">
                        <span class="status"></span>
                      </span>
                      <span class="text ml-3" v-if="order.paid">已付款</span>
                      <span class="text ml-3" v-else>未付款</span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table border" v-else>
              <thead>
                <tr align="center">
                  <th scope="col">圖片</th>
                  <th scope="col">類別</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">數量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id" align="center">
                  <td width="50">
                    <img :src="item.product.imageUrl[0]" alt="" width="50">
                  </td>
                  <td>{{item.product.category}}</td>
                  <td>{{item.product.title}}</td>
                  <td>{{item.quantity}}</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-main" @click="updateOrder(order)">
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

export default {
  data() {
    return {
      order: {
        coupon: {},
        user: {},
        updated: {},
      },
      payment: '', // 呈現付款方式文字用
      nowPaid: '', // 判斷目前是否付款
      isLoading: false,
      detail: false,
    };
  },
  methods: {
    getOrder(id, show) {
      // GET api/{uuid}/admin/ec/orders/{id}
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      this.$http.get(api).then((res) => {
        this.order = res.data.data;
        this.nowPaid = this.order.paid;
        switch (this.order.payment) {
          case 'ATM':
            this.payment = '貨到付款';
            break;
          case 'WebATM':
            this.payment = '銀行轉帳';
            break;
          case 'Credit':
            this.payment = '信用卡';
            break;
          default:
        }
        $('#orderModal').modal('show');
        if (show === 'show') {
          this.detail = true;
        } else {
          this.detail = false;
        }
        this.isLoading = false;
      })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '讀取錯誤',
            text: '資料讀取異常，請洽資訊人員',
          });
        });
    },

    updateOrder(item) {
      // 沒修改就不觸發下面 API
      if (this.nowPaid === item.paid) {
        this.nowPaid = '';
        $('#orderModal').modal('hide');
        return;
      }

      // PATCH api/{uuid}/admin/ec/orders/{id}/paid
      // PATCH api/{uuid}/admin/ec/orders/{id}/unpaid
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      if (item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      }
      this.$http.patch(api, item.id).then(() => {
        this.$emit('update');
        $('#orderModal').modal('hide');
      })
        .catch(() => {
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
<style lang="scss" scoped>
.table th, .table td{
  vertical-align: middle;
}
.table-switch{
  display: inline-block;
  border-left: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  font-size: 1.25rem;
  transition: 0.25s;
  &:last-child{
    border-right: 1px solid #dee2e6;
  }
  &.active{
    background: #b29987;
    color: #fff;
  }
}
.btn-switch {
  display:inline-block;
  vertical-align:middle;
  width: 40px;
  height: 20px;
  border-radius:100px;
  background-color: #ccc;
  transition: .75s;
  .status {
    display:inline-block;
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: #fff;
    margin-left: 0;
    box-shadow: 0px 0px 5px 0px #7d7d7d;
    transition: .25s;
  }
}
.paid {
  position:absolute;
  opacity:0;
  &:checked + .btn-switch{
    background-color: #8f8;
    .status{
      margin-left: 20px;
    }
  }
}
</style>
