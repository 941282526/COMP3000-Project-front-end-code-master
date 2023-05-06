<template>
  <div class="wrapper, shop">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe697;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe752;</span>
        <input
          class="search__content__input"
          placeholder="Please enter the product name"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart :shopName="item.name" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
// import { useRouter, useRoute } from "vue-router";
import request from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from "./Cart";
import {useRouter} from "vue-router";

// 获取当前商铺信息
const useShopInfoEffect = () => {
  //可以获取到当前路由中的具体信息
  // const route = useRoute();${route.params.id}
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await request.get(`/home/shop/1`);
    if (result.message === "success" && result.code === 0) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return handleBackClick;
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    //进入到shop页面就需要把订单信息制空
    localStorage.setItem("orderList", "");
    const { item, getItemData } = useShopInfoEffect();
    const handleBackClick = useBackRouterEffect();
    getItemData();
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@media screen and (max-width: 600px) {
  .wrapper {
    padding: 0 0.18rem;
  }
  .search {
    display: flex;
    margin: 0.14rem 0 0.04rem 0;
    line-height: 0.32rem;
    &__back {
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      background: $search-bgColor;
      border-radius: 0.16rem;
      &__icon {
        width: 0.44rem;
        text-align: center;
        color: $search-fontColor;
      }
      &__input {
        display: block;
        width: 100%;
        padding-right: 0.2rem;
        border: none;
        outline: none;
        background: none;
        height: 0.32rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
        &::placeholder {
          color: $content-fontcolor;
        }
      }
    }
  }
}
@media screen and (min-width: 600px) {
  .wrapper {
    padding: 0 18px
  }
  .search {
    display: flex;
    margin: 14px 0 4px 0;
    line-height: 32px;
    &__back {
      width: 30px;
      font-size: 24px;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      background: $search-bgColor;
      border-radius: 16px;
      &__icon {
        width: 24px;
        font-size: 24px;
        text-align: center;
        color: $search-fontColor;
      }
      &__input {
        display: block;
        width: 100%;
        padding-right: 20px;
        border: none;
        outline: none;
        background: none;
        height: 32px;
        font-size: 14px;
        color: $content-fontcolor;
        &::placeholder {
          color: $content-fontcolor;
        }
      }
    }
  }

}

</style>
