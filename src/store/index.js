import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import productsModules from './Products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 嚴謹模式
  state: {
    isLoading: true,
  },
  actions: { // 操作行為
    // context 固定
    // payload 外部傳入的參數 ( 自訂 )
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
  },
  mutations: { // 操作狀態
    LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  getters: {

  },
  modules: {
    productsModules,
  },
});
