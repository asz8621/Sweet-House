<template>
    <section class="p-4">
      <div class="container">
        <div class="headline py-4">
          <h2>{{cardTitle}}</h2>
          <a href="#" class="btn btn-outline-main headline-link" @click="$router.push('products')">更多</a>
          <hr class="headline-bottom">
        </div>
      </div>

      <div class="container">
        <div class="swiper-card">
          <swiper class="swiper" :options="swiperOption" v-if="cardData.length">
            <swiper-slide v-for="item in cardData" :key="`${item.id}${cardClassName}`">
              <div class="swiper-card-body">
                <div class="card-img" @click="$router.push(`/product/${item.id}`)">
                    <img :src="item.imageUrl[0]" alt="" class="img-fluid" />
                </div>
                <h4 class="swiper-card-title">{{item.title}}</h4>
                <div class="swiper-card-price">
                  <span class="narrow">NT$</span>{{item.price}}
                </div>

                <button type="button" class="large-size btn btn-main w-100 d-flex justify-content-center align-items-center"
                @click.prevent="addCart(item.id)" :disabled="status.btnLoading !== '' ">
                  <span>加入購物車</span>
                  <div class="spinner-border spinner-border-sm ml-2" role="status"
                  v-if="status.btnLoading === item.id">
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" :class="`${cardClassName}-pagination`"></div>
            <div class="swiper-button-prev" slot="button-prev" :class="`${cardClassName}-prev`"></div>
            <div class="swiper-button-next" slot="button-next" :class="`${cardClassName}-next`"></div>
          </swiper>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  props: ['cardClassName', 'cardData', 'cardTitle', 'carts'],
  data() {
    return {
      status: {
        btnLoading: '',
      },
      swiperOption: {
        slidesPerView: 1,
        // spaceBetween: 10,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
          991: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          540: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
        pagination: {
          el: `.${this.cardClassName}-pagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `.${this.cardClassName}-next`,
          prevEl: `.${this.cardClassName}-prev`,
        },
      },
    };
  },
  methods: {
    addCart(id, quantity = 1) { // 加入購物車
      this.status.btnLoading = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      let httpMethod = 'post';
      let qty = quantity; // 數量
      let statusBtn = 'add'; // 預設 add
      // 如果購物車有一樣的產品做更新
      const mapData = this.carts.filter((item) => id === item.product.id);
      if (mapData.length > 0) {
        httpMethod = 'patch';
        qty += mapData[0].quantity;
        statusBtn = 'edit';
      }
      const cart = {
        product: id,
        quantity: qty,
      };
      this.$http[httpMethod](api, cart).then(() => {
        this.$bus.$emit('getcart', statusBtn);
        this.status.btnLoading = '';
      }).catch((errors) => {
        this.$toast.error(`${errors.response.data.errors}`, { icon: 'fas fa-times' });
        this.status.btnLoading = '';
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .swiper-card{
      position: relative;
      .swiper-card-body {
        padding: 0.75rem;
        margin-bottom: 1.25rem;
        border: none;
        .card-img {
          overflow: hidden;
          cursor: pointer;
          img{
            border-radius: 5px;
            transition: 0.75s;
          }
        }
        &:hover {
          .card-img {
            img{
              transform:scale(1.05);
            }
          }
        }
      }
      .swiper-card-title{
        margin: 0.25rem 0;
      }
      .swiper-card-price {
        margin-bottom: 0.25rem;
        text-align: right;
        font-size: 1.5rem;
        color: red;
        .narrow{
          font-size: 0.75rem;
          margin-right: 5px;
        }
      }
    }
    .swiper-button-prev,.swiper-button-next{
      display: none;
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 0;
    }
    .slideControls .slidePrev {
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 2rem;
      color: #867162;
      z-index: 100;
    }
    .slideControls .slideNext {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 2rem;
      color: #867162;
      z-index: 100;
    }
    @media (min-width: 414px) {
      .swiper-card{
        .swiper-card-title{
          margin: 0.75rem 0;
        }
        .swiper-card-price {
          margin-bottom: 0.75rem;
        }
      }
    }
    @media (min-width: 768px) {
      /* 768 以上 */
      .swiper-button-prev{
        display: block;
        left: -50px;
        color: #867162;
      }
      .swiper-button-next{
        display: block;
        right: -50px;
        color: #867162;
      }
    }
</style>
