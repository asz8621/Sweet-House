<template>
  <div class="content">
    <div class="container pt-5 pb-5">
      <Breadcrumb></Breadcrumb>
      <div class="headline py-4">
        <h2>聯絡我們</h2>
        <hr class="headline-bottom">
      </div>
      <div class="row py-5">
        <div class="col-md-6">
          <div class="form">
            <ValidationObserver v-slot="{ invalid }">
              <form>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="name">姓名</label>
                    <input type="text" id="names" class="form-control"
                    :class="classes" placeholder="請輸入姓名"
                    name="姓名" v-model="form.name">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required|integer|min:8|numeric" v-slot="{ errors, classes }">
                    <label for="phone">電話</label>
                    <input type="tel" id="phone" class="form-control"
                    :class="classes" placeholder="請輸入電話"
                    name="電話" v-model="form.phone">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                    <label for="email">信箱</label>
                    <input type="text" id="email" class="form-control"
                    :class="classes" placeholder="請輸入信箱"
                    name="信箱" v-model="form.email">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="message">問題描述或相關建議</label>
                    <textarea id="message" class="form-control" :class="classes"
                    rows="5" placeholder="留下您的問題或建議"
                    name="問題或建議" v-model="form.message"></textarea>
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <button class="large-size btn btn-main w-100" type="submit" :disabled="invalid">送出表單</button>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.800451128156!2d120.31784567600603!3d22.594025372626124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e036a5d95c9a9%3A0xb983a800c2334e9b!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5Yex5pe66KGX!5e0!3m2!1szh-TW!2stw!4v1611556123162!5m2!1szh-TW!2stw"
             width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb.vue';

export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        message: '',
      },
    };
  },
};
</script>
<style lang="scss">
</style>
