import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueWindowResize from 'vue-window-resize';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'bootstrap';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './bus';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import CKEditor from 'ckeditor4-vue';

// import { ValidationProvider, extend } from 'vee-validate';
// import * as rules from 'vee-validate/dist/rules';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import store from './store';
import thousandsFilter from './filters/thousands';
import App from './App.vue';
import router from './router';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css';

// Toast 設定
const options = {
  position: 'top-left',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  // icon: 'fas fa-check',
  rtl: false,
};
Vue.use(Vuex);
Vue.component('VueWindowResize', VueWindowResize);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
swiper.use([Navigation, Pagination, Autoplay]);
Vue.component('VueLoading', VueLoading);
Vue.use(VueSweetalert2);
Vue.use(Toast, options);
Vue.use(CKEditor);
Vue.filter('thousands', thousandsFilter);
// Vue.component('VueSweetalert2', VueSweetalert2);

// VeeValidate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
localize('zh_TW', tw);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
