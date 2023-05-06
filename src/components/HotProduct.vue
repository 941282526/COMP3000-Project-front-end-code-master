<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" alt="fail" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': !hideBorder,
      }"
    >
<!--      <div class="shop__content__title">{{ item.name }}</div>-->
<!--      <div class="shop__content__tags">-->
<!--        <span class="shop__content__tag">月售: {{ item.sales }}</span>-->
<!--        <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>-->
<!--        <span class="shop__content__tag"-->
<!--          >基础运费: {{ item.expressPrice }}</span-->
<!--        >-->
<!--      </div>-->
      <div class="product__item__detail">
        <h4 class="product__item__title">{{ item.name }}</h4>
        <p class="product__item__sales">
          Monthly sale {{ item.sales }} piece
        </p>
        <p class="product__item__price">
                    <span class="product__item__yen"> £</span
                    >{{ item.price }}
          <span class="product__item__origin"
          > £{{ item.oldPrice }}</span
          >
        </p>
      </div>
      <!--      <p class="shop__content__highlight">{{ item.discount }}</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "HotProduct",
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
@import "../style/mixins.scss";
@media screen and(min-width: 600px) {
  .shop {
    display: inline-block;
    width: 600px;
    padding-top: 12px;
    text-align: center;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
    &__content {
      flex: 1;
      padding-bottom: 0.12rem;
      &--bordered {
        border-bottom: 1px solid $content-bgColor;
      }
      &__title {
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: $content-fontcolor;
      }
      &__tags {
        margin-top: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $content-fontcolor;
      }
      &__tag {
        margin-right: 0.16rem;
      }
      &__highlight {
        margin: 0.08rem 0 0 0;
        line-height: 0.18rem;
        font-size: 0.13rem;
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
  .product {
    overflow-y: scroll;
    flex: 1;
    .cate-title {
      color: gray;
      font-size: 0.1rem;
      height: 0.2rem;
      line-height: 0.2rem;
      padding-left: 0.12rem;
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid $content-bgColor;
      &__detail {
        overflow: hidden;
      }
      &__img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      &__title {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__sales {
        margin: 0.06rem 0;
        font-size: 0.12rem;
        color: $content-fontcolor;
      }
      &__price {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $hightlight-fontColor;
      }
      &__yen {
        font-size: 0.12rem;
      }
      &__origin {
        margin-left: 0.06rem;
        line-height: 0.2rem;
        font-size: 0.12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }
      .product__number {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
        font-size: 0.15rem;
        line-height: 0.18rem;
        &__minus {
          position: relative;
          top: 0.02rem;
          font-size: 0.2rem;
          color: $medium-fontColor;
          margin-right: 0.05rem;
        }
        &__plus {
          position: relative;
          top: 0.02rem;
          font-size: 0.2rem;
          color: $btn-bgColor;
          margin-left: 0.05rem;
        }
      }
    }
  }
}
@media screen and(max-width: 600px) {
  .shop {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
    &__content {
      flex: 1;
      padding-bottom: 0.12rem;
      &--bordered {
        border-bottom: 1px solid $content-bgColor;
      }
      &__title {
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: $content-fontcolor;
      }
      &__tags {
        margin-top: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $content-fontcolor;
      }
      &__tag {
        margin-right: 0.16rem;
      }
      &__highlight {
        margin: 0.08rem 0 0 0;
        line-height: 0.18rem;
        font-size: 0.13rem;
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
  .product {
    overflow-y: scroll;
    flex: 1;
    .cate-title {
      color: gray;
      font-size: 0.1rem;
      height: 0.2rem;
      line-height: 0.2rem;
      padding-left: 0.12rem;
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid $content-bgColor;
      &__detail {
        overflow: hidden;
      }
      &__img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      &__title {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__sales {
        margin: 0.06rem 0;
        font-size: 0.12rem;
        color: $content-fontcolor;
      }
      &__price {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $hightlight-fontColor;
      }
      &__yen {
        font-size: 0.12rem;
      }
      &__origin {
        margin-left: 0.06rem;
        line-height: 0.2rem;
        font-size: 0.12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }
      .product__number {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
        font-size: 0.15rem;
        line-height: 0.18rem;
        &__minus {
          position: relative;
          top: 0.02rem;
          font-size: 0.2rem;
          color: $medium-fontColor;
          margin-right: 0.05rem;
        }
        &__plus {
          position: relative;
          top: 0.02rem;
          font-size: 0.2rem;
          color: $btn-bgColor;
          margin-left: 0.05rem;
        }
      }
    }
  }
}

</style>
