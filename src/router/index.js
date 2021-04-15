import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 解决 Router 重複點選錯誤
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        meta: {
          title: '弄甜屋｜Sweet House',
        },
        component: () => import('../views/frontend/index.vue'),
      },
      {
        path: 'search/q=:searchName',
        name: 'search',
        meta: {
          title: '搜尋｜Sweet House',
        },
        component: () => import('../views/frontend/Search.vue'),
        props: { default: true, sidebar: false },
      },
      {
        path: 'about',
        name: '關於弄甜屋',
        meta: {
          title: '關於我們｜弄甜屋',
        },
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'products',
        name: '全部產品',
        meta: {
          title: '所有產品｜弄甜屋',
        },
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        meta: {
          title: '產品｜弄甜屋',
        },
        component: () => import('../views/frontend/Product.vue'),
        props: { default: true, sidebar: false },
      },
      {
        path: 'contact',
        name: '聯絡我們',
        meta: {
          title: '聯絡我們｜弄甜屋',
        },
        component: () => import('../views/frontend/Contact.vue'),
      },
      {
        path: 'checkout',
        name: '訂單確認',
        meta: {
          title: '購物結帳｜弄甜屋',
        },
        component: () => import('../views/frontend/Checkout.vue'),
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/backend/Navbar.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/backend/index.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/backend/Order.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
