import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/frontend/index.vue'),
      },
      {
        path: 'about',
        name: '關於弄甜屋',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'products',
        name: '全部產品',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
        props: { default: true, sidebar: false },
      },
      {
        path: 'contact',
        name: '聯絡我們',
        component: () => import('../views/frontend/Contact.vue'),
      },
      {
        path: 'checkout',
        name: '訂單確認',
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

export default router;
