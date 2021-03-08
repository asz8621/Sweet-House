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
            <div>
              <button @click="detail=false">999</button>
              <button @click="detail=true">1010</button>
            </div>

            <table class="table" v-if="!detail">
              <tbody>
                <tr>
                  <th scope="row" width="150" class="text-right">姓名：</th>
                  <td>{{order.user.name}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">信箱：</th>
                  <td>{{order.user.email}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">電話：</th>
                  <td>{{order.user.tel}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">地址：</th>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">折價劵：</th>
                  <td>{{`${order.coupon.title} - [ 折扣金額 ${order.coupon.percent} 元 ]`}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">付款方式：</th>
                  <td>{{order.payment}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">是否付款：</th>
                  <td v-if="order.paid">已付款</td>
                  <td v-else>未付款</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">總金額：</th>
                  <td>{{order.amount}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">備註：</th>
                  <td>{{order.message}}</td>
                </tr>
                <tr>
                  <th scope="row" width="150" class="text-right">訂單建立時間：</th>
                  <td>{{order.updated.datetime}}</td>
                </tr>
              </tbody>
            </table>

            <table class="table" v-else>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td width="100">
                    <img :src="item.product.imageUrl[0]" alt="" width="100">
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
            <button type="button" class="btn btn-main">
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
      isLoading: false,
      detail: false,
    };
  },
  methods: {
    getOrder(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      this.$http.get(api).then((res) => {
        this.order = res.data.data;
        $('#orderModal').modal('show');
        this.detail = false;
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
  },
};
</script>
