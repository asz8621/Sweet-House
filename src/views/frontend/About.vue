<template>
  <div class="content">
    <VueLoading loading :active.sync="isLoading">
      <loading></loading>
    </VueLoading>
    <div class="container pt-5 pb-5">
      <Breadcrumb></Breadcrumb>
      <section class="about-business pb-4">
        <div class="headline py-4">
          <h2>創業啟程</h2>
          <hr class="headline-bottom">
        </div>
        <div class="timeline p-4">
          <ul class="timeline-content">
            <li class="timeline-item py-4">
              <h5 class="timeline-title p-3">2019 年 06 月</h5>
              <div class="timeline-text py-3">憑著對甜點的熱情與堅持，考取西點烘培證照。</div>
            </li>
            <li class="timeline-item 23">
              <h5 class="timeline-title p-3">2019 年 07 月</h5>
              <div class="timeline-text py-3">開始專注研究天然食材來製作蛋糕與餅乾。</div>
            </li>
            <li class="timeline-item py-4">
              <h5 class="timeline-title p-3">2020 年 04 月</h5>
              <div class="timeline-text py-3">在 FACEBOOK 經營每日限量販售。</div>
            </li>
            <li class="timeline-item py-4">
              <h5 class="timeline-title p-3">2021 年 01 月</h5>
              <div class="timeline-text py-3">為了從小的夢想而創立的小小糕餅店正式誕生在高雄。</div>
            </li>
          </ul>
        </div>
      </section>
      <section class="about-idea pb-4">
        <div class="headline py-4">
          <h2>經營理念</h2>
          <hr class="headline-bottom">
        </div>
        <div class="idea bg-cover p-4">
          <div class="row">
            <div class="col-md-7">
              <ul>
                <li>
                  <h4 class="text-main">「品嘗幸福」</h4>
                  <p>想讓大家能夠品嘗到我們所做的甜點，在品嘗過程中感到有幸福和滿足感。</p>
                </li>
                <li>
                  <h4 class="text-main">「食材選擇」</h4>
                  <p>我們堅持嚴選食材，透過食材最單純與天然的味道、運用季節性的產地水果、賦予甜點充滿「幸福」的生命力。</p>
                </li>
                <li>
                  <h4 class="text-main">「專注投入」</h4>
                  <p>用心製作每一道甜點，注重每次製作過程中的細節與溫度，就因為我們的用心與堅持，才能製作出一道道驚喜卻無負擔的甜點。</p>
                </li>
                <li>
                  <h4 class="text-main">「創造回憶」</h4>
                  <p>從手工製作甜點、包裝及出貨給顧客甜點的同時，用一份用心的甜點延續與顧客之間更深層的故事、延續每一個珍貴美好的回憶。</p>
                </li>
              </ul>
              <p>現在，只要你輕撩指尖，美味甜點即時到來！</p>
              <button type="button" class="large-size btn btn-main" @click="goProducts">前往幸福天堂</button>
            </div>
            <div class="col-md-5">
              <div class="idea-img bg-cover"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import loading from '../../components/Loading.vue';
import Breadcrumb from '../../components/Breadcrumb.vue';

export default {
  components: {
    loading,
    Breadcrumb,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    goProducts() {
      this.$router.push({ path: '/Products' });
    },
  },
};
</script>
<style lang="scss">

</style>
