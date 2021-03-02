<template>
  <div>
    <footer>
      <div class="footer py-5">
        <div class="footer-media">
          <img src="../../assets/images/logo.png" alt="" height="150" class="footer-logo" />
          <ul>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-facebook-square"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-instagram-square"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="media-item text-main">
                <i class="fab fa-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-info">
          <ul>
            <li class="py-1">
              <span>
                <i class="fas fa-phone"></i>電話：
              </span>
              <a href="tel:07-5168168">07-5168168</a>
            </li>
            <li class="py-1">
              <span>
                <i class="far fa-envelope"></i>信箱：
              </span>
              <a href="mailto:money168@give.com">money168@give.com</a>
            </li>
            <li class="py-1">
              <span>
                <i class="fas fa-map-marked-alt"></i>地址：高雄市前鎮區凱旺街1號
              </span>
            </li>
            <li class="py-1">
              <span>
                <i class="far fa-clock"></i>營業時間：8:00 ~ 20:00
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-center py-3">
        Copyright 2020 © 弄甜屋 All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log('fff:', this.$route.path);
  },
};

</script>

<style lang="scss">
</style>
