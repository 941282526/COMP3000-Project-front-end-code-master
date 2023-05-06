<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" alt="fail" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': !hideBorder,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">Monthly sale: {{ item.sales }}</span>
        <span class="shop__content__tag">Start delivery: {{ item.expressLimit }}</span>
        <span class="shop__content__tag">Base freight: {{ item.expressPrice }}</span>
      </div>
      <!--      <p class="shop__content__highlight">{{ item.discount }}</p>-->
    </div>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="../../public/editfile/shouye.png"
      alt="fail"
    />
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
@media screen and (max-width: 600px) {
  .shop {
    display: none;
    display: flex;
    padding-top: 12px;
    &__img {
      margin-right: 16px;
      width: 56px;
      height: 56px;
    }
    &__content {
      flex: 1;
      padding-bottom: 12px;
      &--bordered {
        border-bottom: 1px solid $content-bgColor;
      }
      &__title {
        line-height: 22px;
        font-size: 16px;
        color: $content-fontcolor;
      }
      &__tags {
        margin-top: 8px;
        line-height: 18px;
        font-size: 13px;
        color: $content-fontcolor;
      }
      &__tag {
        margin-right: 16px;
      }
      &__highlight {
        margin: 8px 0 0 0;
        line-height: 18px;
        font-size: 13px;
        color: #e93b3b;
      }
    }
  }
  
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
  }
}
@media screen and (min-width: 600px) {
  .shop{
    display: none;
  }
  .banner {
    display: none;
  }
}
</style>
