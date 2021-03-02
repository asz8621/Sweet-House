<template>
  <div>
    <nav aria-label="pagination">
      <ul class="pagination">

        <!-- previous -->
        <li class="page-item"
        :class="{'disabled': pages.current_page === 1}">
          <a class="page-link" href="#"
          aria-label="Previous"
          @click.prevent="previous(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- 1 ~ N -->
        <li v-for="(item,index) in pages.total_pages"
        :key="index"
        class="page-item"
        :class="{'active':item === pages.current_page}">
          <a class="page-link" href="#"
          @click.prevent="previous(item)">{{item}}</a>
        </li>

        <!-- Next -->
        <li class="page-item"
        :class="{'disabled': pages.current_page === pages.total_pages}">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="previous(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    pages: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  methods: {
    previous(page) {
      this.$emit('previous', page);
    },
  },
};
</script>
<style lang="scss">

</style>
