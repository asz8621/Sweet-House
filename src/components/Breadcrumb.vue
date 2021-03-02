<template>
  <div :class="{ 'breadcrumb-top': paddingTop }">
    <nav aria-label="breadcrumb">
      <!-- <ol class="breadcrumb px-0 m-0 bg-white"> -->
      <ol class="breadcrumb px-0 bg-white">
        <li class="breadcrumb-item">
          <router-link to="/"><i class="fas fa-home text-main"></i></router-link>
        </li>
        <li class="breadcrumb-item" :class="{'active':!deepLink}">
          <router-link to="/products" class="text-main" v-if="deepLink">全部產品</router-link>
          <span v-else>{{this.$route.name}}</span>
        </li>
        <li class="breadcrumb-item active" :class="{'active':deepLink}" aria-current="page" v-if="deepLink">
          {{productTitle}}
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
export default {
  // paddingTop 產品頁浮動選單會擋住，打開增加 padding-top
  props: ['productTitle', 'paddingTop'],
  data() {
    return {
      product: [],
      deepLink: false,
    };
  },
  mounted() {
    this.links(this.$route.name);
  },
  methods: {
    links(routeName) {
      if (routeName === 'Product') {
        this.deepLink = true;
      } else {
        this.deepLink = false;
      }
    },
  },
};
</script>
<style lang="scss">
.breadcrumb-top{
  padding-top: 4.5rem;
}
@media (min-width: 768px) {
  /* 768 以上 */
  .breadcrumb-top{
    padding-top: 0;
  }
}
</style>
