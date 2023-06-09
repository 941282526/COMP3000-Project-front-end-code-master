<template>
  <div class="products">
    <div class="products__title">
      {{ shopName }}
    </div>
    <div class="products__wrapper">
      <div class="products__list">
        <div
          v-for="item in orderProductList"
          :key="item.id"
          class="products__item"
        >
          <img
            class="products__item__img"
            :src="item.imgUrl"
            alt="fail"
          />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen"> £ </span>
                {{ item.price }} x {{ item.count }}
              </span>
              <span class="products__item__total">
                <span class="products__item__yen"> £ </span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <OrderSubmit :totalPrice="totalPrice" />
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "@/effects/CartEffects";
import OrderSubmit from "./OrderSubmit";

const useTotalPriceEffect = (productList) => {
  //求总价
  let totalPrice = 0;
  let orderProductList = [];
  for (const i in productList.value) {
    const product = productList.value[i];
    totalPrice += product.price * product.count;
    orderProductList.push(product);
  }

  totalPrice = totalPrice.toFixed(2);

  return { orderProductList, totalPrice };
};

export default {
  name: "OrderProductList",
  components: { OrderSubmit },
  setup() {
    const route = useRoute();
    const shopId = route.params.shopId;
    const { shopName, productList } = useCommonCartEffect(shopId);
    const { totalPrice, orderProductList } = useTotalPriceEffect(productList);

    return {
      shopName,
      orderProductList,
      totalPrice,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
@media screen and (max-width: 600px) {
  .products {
    margin: 0.16rem 0.18rem 0.1rem 0.18rem;
    background: $bgColor;
    &__title {
      padding: 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__wrapper {
      overflow-y: scroll;
      margin: 0 0.18rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.6rem;
      top: 2.6rem;
    }
    &__list {
      background: $bgColor;
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0 0.16rem 0.16rem 0.16rem;
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__detail {
        flex: 1;
      }
      &__title {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__price {
        display: flex;
        margin: 0.06rem 0 0 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: $hightlight-fontColor;
      }
      &__total {
        flex: 1;
        text-align: right;
        color: $dark-fontColor;
      }
      &__yen {
        font-size: 0.12rem;
      }
    }
  }
}
@media screen and (min-width: 600px) {
  .products {
    margin: 16px 18px 10px 18px;
    background: $bgColor;
    &__title {
      padding: 16px;
      font-size: 16px;
      color: $content-fontcolor;
    }
    &__wrapper {
      overflow-y: scroll;
      margin: 0 18px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 60px;
      top: 260px;
    }
    &__list {
      background: $bgColor;
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0 16px 16px 16px;
      &__img {
        width: 46px;
        height: 46px;
        margin-right: 16px;
      }
      &__detail {
        flex: 1;
      }
      &__title {
        margin: 0;
        line-height: 20px;
        font-size: 14px;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__price {
        display: flex;
        margin: 6px 0 0 0;
        line-height: 20px;
        font-size: 14px;
        color: $hightlight-fontColor;
      }
      &__total {
        flex: 1;
        text-align: right;
        color: $dark-fontColor;
      }
      &__yen {
        font-size: 12px;
      }
    }
  }
}
</style>
