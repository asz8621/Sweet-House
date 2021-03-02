<template>
  <div class="admin">
    <nav class="admin-nav">
      <div class="sticky">
        <div class="nav-title">
          <img src="../../assets/images/logo.png" alt="" width="100">
          <h1>後台管理</h1>
        </div>
        <ul class="admin-menu">
          <li>
            <router-link to="products">產品管理</router-link>
            </li>
          <li>
            <router-link to="coupons">優惠卷管理</router-link>
          </li>
          <li>
            <router-link to="order">訂單管理</router-link>
          </li>
          <li>
            <router-link to="/">返回前台</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="content">
      <router-view :token="token" v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)SHtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
      this.$http.post(api, { api_token: this.token }).then((res) => {
        if (res.data.success) {
          this.checkSuccess = true;
        }
      }).catch((error) => {
        console.log(error);
        // 沒有 token 轉跳首頁
        this.$router.push('/');
      });
    },
  },
};
</script>
<style lang="scss">
  body{
    color: #867162;
  }
  ul{
    list-style: none;
  }
  a, a:hover{
    text-decoration: none;
  }
  .admin{
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .admin-nav{
    width: 15%;
    background: #ffe0cb;
    .sticky{
      position: sticky;
      top: 0;
      z-index: 10;
      height: 100vh;
    }
  }
  .nav-title{
    text-align: center;
    padding: 1rem 0;
    img{
      margin-bottom: 0.5rem;
    }
  }
  .admin-menu{
    padding: 0 2rem;
    li{
      padding: 0.5rem 0;
      a{
        display: block;
        color: #4c4e56;
      }
      a:hover{
        color: rgb(99, 99, 99);
      }
    }
  }
  .content{
    width: 85%;
    padding: 1rem;
  }
</style>
