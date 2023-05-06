<template>
  <!-- 底部tabar -->
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{ 'docker__item--active': index === currentIndex }"
      class="docker__item"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe751;", text: "Home", to: { name: "Home" } },
      { icon: "&#xe899;", text: "Shopping cart", to: { name: "CartList" } },
      { icon: "&#xe737;", text: "Order", to: { name: "OrderList" } },
      { icon: "&#xe600;", text: "My", to: { name: "My" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
// 底部tabar

@media screen and (min-width: 600px) {
  .docker{
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .docker {
    display: inline-flex;
    box-sizing: border-box;
    position: absolute;
    padding: 0 0.18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    background: #ffffff;
    border-top: 0.01rem solid $content-bgColor;
    &__item {
      flex: 1;
      text-align: center;
      a {
        color: $content-fontcolor;
        text-decoration: none;
      }
      .iconfont {
        margin: 0.2rem 0 0.02rem 0;
        font-size: 0.18rem;
      }
      &--active {
        a {
          color: #1fa4fc;
        }
      }
    }
    &__title {
      font-size: 0.2rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
    }
  }
}
</style>
