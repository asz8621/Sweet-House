<template>
  <div class="login">
    <img class="mb-3" src="../../assets/images/logo.png" alt="" width="200">
    <form class="form-signin" @submit.prevent="signin">
      <div class="signin-group">
        <input
          type="email"
          id="inputEmail"
          class="login-input form-control mb-4"
          placeholder="Account"
          v-model="user.email"
          autocomplete="off"
          required
        />
        <label for="inputEmail" class="signin-icon">
          <i class="fas fa-user-alt"></i>
        </label>
      </div>
      <div class="signin-group">
        <input
          type="password"
          id="inputPassword"
          class="login-input form-control mb-4"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <label for="inputPassword" class="signin-icon">
          <i class="fas fa-key"></i>
        </label>
      </div>
      <button type="submit" class="large-size btn btn-lg btn-main btn-block">登入</button>
      <p class="text-muted mt-6 mb-4">&copy; 2021 弄甜屋 All Rights Reserved.</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http.post(api, this.user).then((res) => {
        const { token, expired } = res.data;
        document.cookie = `SHtoken=${token}; expires=${new Date(expired * 1000)}; path=/`;
        this.$router.push('/admin/index');
      }).catch(() => {
        alert('請確認帳號密碼');
        this.user.password = '';
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
  }
  .signin-group{
    position: relative;
    .signin-icon{
      position: absolute;
      top: 50%;
      left: 10px;
      z-index: 1;
      transform: translateY(-50%);
      font-size: 1.5rem;
      margin: 0;
      transition: .5s;
    }
    .login-input{
      padding-left: 3rem;
      transition: .5s;
      &:focus{
        padding-left: 0.75rem;
        z-index: 2;
      }
      &:focus+label{
        opacity: 0;
      }
    }
  }
}
</style>
