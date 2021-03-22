import axios from 'axios';

export default {
  // state 模組區域變數
  // 目前 actions, mutations, getters 是屬於全域變數
  namespaced: true, // namespaced: true -> actions, mutations, getters 是屬於區域變數
  strict: true, // 嚴謹模式
  state: {
    product: {},
    pagination: {},
    classificationName: '',
    typeProduct: [], // 產品切換
    classification: [], // 大類別
  },
  actions: { // 操作行為
    // context 固定
    // payload 外部傳入的參數 ( 自訂 )
    getProducts(context) { // 讀取所有商品資料
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      axios.get(api)
        .then((res) => {
          // 取得產品
          context.commit('PRODUCT', res.data.data);
          // 大類別產品
          context.commit('TYPEPRODUCT', res.data.data);
          // 頁碼
          context.commit('PAGINATION', res.data.meta.pagination);
          // 預設大類別為->全部產品
          context.commit('CLASSIFICATIONNAME', '全部產品');

          context.commit('CLASSIFICATION', res.data.data);

          // 關閉 Loading
          context.commit('LOADING', false, { root: true });
        })
        .catch(() => {
          this.$toast.error('資料讀取異常，請洽客服人員', { icon: 'fas fa-times' });
        });
    },
    filterProducts(context, payload) { // 產品切換
      // 清空大類別資料
      context.commit('TYPEPRODUCT', []);
      // 變更大類別名稱
      context.commit('CLASSIFICATIONNAME', payload);
      // 變更大類別名稱的產品
      context.commit('TYPEPRODUCTALL', payload);
    },
  },
  mutations: { // 操作狀態
    PRODUCT(state, payload) {
      state.product = payload;
    },
    TYPEPRODUCT(state, payload) {
      state.typeProduct = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CLASSIFICATION(state, payload) {
      // 集合所有產品的大類別, 移除陣列重複的值
      state.classification = payload.map((item) => item.category)
        .filter((type, index, arr) => arr.indexOf(type) === index);
      // 插入 全部產品 到陣列的第一筆
      state.classification.splice(0, 0, '全部產品');
    },
    CLASSIFICATIONNAME(state, payload) {
      state.classificationName = payload;
    },
    FILTERPRODUCTS(state, payload) {
      state.classificationName = payload;
    },
    TYPEPRODUCTALL(state, payload) {
      // 全部就拷貝
      if (payload === '全部產品') {
        state.typeProduct = state.product;
      } else {
        // 不是全部跑迴圈
        state.product.forEach((item) => {
          if (item.category === payload) {
            state.typeProduct.push(item);
          }
        });
      }
    },
  },
  getters: {
    product(state) {
      return state.product;
    },
    typeProduct(state) {
      return state.typeProduct;
    },
    pagination(state) {
      return state.pagination;
    },
    classification(state) {
      return state.classification;
    },
    classificationName(state) {
      return state.classificationName;
    },
  },
};
