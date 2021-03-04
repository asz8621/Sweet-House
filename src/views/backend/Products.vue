<template>
    <div class="container">
      <VueLoading loading :active.sync="isLoading"></VueLoading>
      <div class="text-right mt-5">
        <button class="btn btn-main" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th width="120">
              圖片
            </th>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="150">
              原價
            </th>
            <th width="150">
              特價
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
          <tr v-for="(item, index) in products" :key="index">
            <td>
              <img :src="item.imageUrl" alt="" width="100">
            </td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-left">
              <span v-html="item.origin_price"></span>
            </td>
            <td class="text-left">
              <span v-html="item.price"></span>
            </td>
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

      <Pagination :pages="pagination" @previous="getProducts"></Pagination>
      <!-- Modal -->
      <ProductModal ref="productModal" :isNew="isNew" @update="getProducts"></ProductModal>
      <DelProductModal :tempProduct="tempProduct" @update="getProducts"></DelProductModal>
    </div>
</template>
<script>
import $ from 'jquery';
import ProductModal from '../../components/modal/ProductModal.vue';
import DelProductModal from '../../components/modal/DelProductModal.vue';
import Toasts from '../../components/Toasts.vue';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    ProductModal,
    DelProductModal,
    Toasts,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
        options: {
          isHot: false,
        },
      },
      isNew: false,
      status: {
        fileUploading: false,
      },
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.data; // 取得產品列表
          this.pagination = res.data.meta.pagination; // 取得分頁資訊
          this.isLoading = false;
          // this.products.options.isHot = false;
          console.log('pppsss', this.products);
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
          // 新增之前必須先清除原有可能暫存的資料
          // 切換狀態為 true 代表新增
          this.isNew = true;
          this.$refs.productModal.getProduct(this.tempProduct, isNew);
          // 切換完畢並清空資料後開啟 Modal
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.isLoading = false;
          // 切換狀態為 false 代表編輯
          this.isNew = false;
          // this.products[1].options = { isHot: false };
          // this.products[2].options = { isHot: false };
          // this.products[3].options = { isHot: false };
          // this.products[4].options = { isHot: false };
          // this.products[5].options = { isHot: false };
          // this.products[6].options = { isHot: false };
          // this.products[7].options = { isHot: false };
          // this.products[8].options = { isHot: false };
          // this.products[9].options = { isHot: false };
          // this.products[10].options = { isHot: false };
          // this.products[11].options = { isHot: false };
          // console.log('ppp', this.products[1].options.isHot);
          console.log('ppp', this.products);
          this.$refs.productModal.getProduct(item.id, isNew);
          break;
        case 'delete':
          // 淺拷貝
          this.tempProduct = { ...item };
          // 拷貝完畢後開啟 Modal
          $('#delProductModal').modal('show');
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
