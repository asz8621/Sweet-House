<template>
  <div>
    <VueLoading loading :active.sync="isLoading"></VueLoading>
    <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="img">輸入圖片網址</label>
                  <input id="img" type="text" class="form-control"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl[0]">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片 <br>( 建議大小：500 X 500 )
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="title">產品名稱</label>
                    <input id="title" v-model="tempProduct.title" type="text"
                    class="form-control" placeholder="請輸入標題" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="category">產品分類</label>
                      <select name="category" class="form-control" v-model="tempProduct.category">
                        <option value="現烤餅乾">現烤餅乾</option>
                        <option value="生日蛋糕">生日蛋糕</option>
                        <option value="杯子蛋糕">杯子蛋糕</option>
                        <option value="馬卡龍">馬卡龍</option>
                      </select>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-row mb-3">
                    <div class="col-5">
                      <label for="size">規格</label>
                        <input id="size" v-model="tempProduct.unit" type="text" class="form-control"
                          placeholder="請輸入產品規格">
                    </div>
                    <div class="col">
                      <label for="origin_price">原價</label>
                      <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                        placeholder="請輸入原價">
                    </div>
                    <div class="col">
                      <label for="price">特價</label>
                      <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                        placeholder="請輸入特價">
                    </div>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品規格</label>
                  <!-- <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                    placeholder="請輸入產品說明" required></textarea> -->
                    <ckeditor id="description" v-model="tempProduct.description" :config="editorConfig"></ckeditor>
                </div>
                <div class="form-group">
                  <label for="content">產品描述</label>
                  <!-- <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                    placeholder="請輸入產品描述" required></textarea> -->
                    <ckeditor id="content" v-model="tempProduct.content" :config="editorConfig"></ckeditor>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-main" @click="updateProduct">
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
  props: ['isNew'],
  data() {
    return {
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      status: {
        fileUploading: false,
      },
      isLoading: false,
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods: {
    getProduct(id, type) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      switch (type) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          this.isLoading = false;
          break;
        default:
          this.$http.get(api).then((res) => {
            this.isLoading = false;
            // 取得成功後回寫到 tempProduct
            this.tempProduct = res.data.data;
            console.log(this.tempProduct.imageUrl.length);
            // 確保資料已經回寫後在打開 Modal
            $('#productModal').modal('show');
          }).catch((error) => {
            // 若出現錯誤則顯示錯誤訊息
            console.log(error);
            this.isLoading = false;
          });
          break;
      }
    },
    updateProduct() {
      // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }
      this.$http[httpMethod](api, this.tempProduct).then(() => {
        this.$emit('update');
        $('#productModal').modal('hide'); // AJAX 新增成功後關閉 Modal
      }).catch((error) => {
        // 若出現錯誤則顯示錯誤訊息
        // eslint-disable-next-line no-console
        console.log(error);
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.status.fileUploading = true;
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          // imageUrl 是空陣列直接新增，如果有資料修改第一筆陣列
          if (this.tempProduct.imageUrl.length === 0) {
            this.tempProduct.imageUrl.push(response.data.data.path);
          } else {
            this.tempProduct.imageUrl.splice(0, 1, response.data.data.path);
          }
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('上傳不可超過 2 MB');
        console.log(error);
        this.status.fileUploading = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .del-btn{
    align-self: flex-end;;
    text-align: center;
    button{
      border: none;
      background: transparent;
      font-size: 1.75rem;
      color: #e6a97e;
    }
  }
</style>
