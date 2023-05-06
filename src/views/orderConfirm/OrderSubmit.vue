<template>
  <div>
    <div class="order">
      <div class="order__price">
        Actual amount paid <b>£{{ totalPrice }}</b>
      </div>
      <div class="order__btn" @click.once="handlePlaceOrder">Submit an order</div>
    </div>
    <div class="mask" v-show="showConfirm">
      <div class="mask__content">
        <h3 class="mask__content__title">The order is created successfully.</h3>
        <p class="mask__content__desc">Please pay as soon as possible. We reduce stock after payment</p>
        <div class="mask__content__btns">
          <div
            class="mask__content__btn mask__content__btn--first"
            @click="() => handleConfirmPay(false, order.value)"
          >
            Pay later
          </div>
          <div
            class="mask__content__btn mask__content__btn--last"
            @click="() => handleConfirmPay(true, order.value)"
          >
            immediatePay
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import request from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
import { useCommonCartEffect } from "@/effects/CartEffects";

// 下单相关逻辑
const useCreateOrderEffect = (shopId, shopName, productList, showToast) => {
  const store = useStore();

  //获取用户信息
  const userInfo = JSON.parse(localStorage.userInfo);
  //用于存储下单成功后的订单信息 支付点击事件中需抛送订单信息
  const order = reactive({});
  //是否显示支付页面 初始为false 下单成功后设为true
  const showConfirm = ref(false);

  //提交订单
  const handlePlaceOrder = async () => {
    // //判断用户是否绑定微信 否则无法下单及支付 下单需要依赖openId
    // if (userInfo.openId == null && userInfo.openId === undefined) {
    //   showToast("用户信息不全 请先绑定微信");
    //   return;
    // }
    //获取购物车中的所有数据
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      products.push({
        productId: parseInt(product.id, 10),
        quantity: product.count,
      });
    }
    //获取用户选择的地址
    const address =
      localStorage.getItem("address") !== ""
        ? JSON.parse(localStorage.getItem("address"))
        : "";
    //向后端下单
    try {
      const result = await request.post("/user/order/create", {
        userId: userInfo.id,
        consigneeName: address.consigneeName,
        tel: address.tel,
        address: address.area + address.detailedAddress,
        userOpenId: userInfo.openId,
        shopId: shopId,
        shopName: shopName.value,
        products: JSON.stringify(products),
      });
      if (result.message === "success" && result.code === 0) {
        //创建订单成功，要清除购物车数据
        store.commit("clearCartData", shopId);
        //赋值订单信息
        order.value = result.data;
        //更改showConfirm值为true 弹出支付确认页面
        showConfirm.value = true;
      } else {
        showToast(result.message);
      }
    } catch (e) {
      showToast("Order failure", e);
    }
  };

  return { handlePlaceOrder, order, showConfirm };
};

// 蒙层确认支付相关逻辑
const useShowMaskEffect = (showToast) => {
  const router = useRouter();

  const handleConfirmPay = async (boolean, order) => {
    if (boolean === false) {
      //如果为false 取消支付 直接跳转订单页面
      await router.push({ name: "OrderList" });
      return;
    }
    const result = await request.post("/user/order/pay", {
      orderNumber: order.orderNumber,
      openId: order.userOpenId,
    });
    if (result.message === "success" && result.code === 0) {
      await router.push({ name: "OrderList" });
    } else {
      showToast(result.message);
    }
  };
  return { handleConfirmPay };
};

export default {
  name: "OrderSubmit",
  components: { Toast },
  props: ["totalPrice"],
  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.shopId, 10);
    const { show, toastMessage, showToast } = useToastEffect();
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { handlePlaceOrder, order, showConfirm } = useCreateOrderEffect(
      shopId,
      shopName,
      productList,
      showToast
    );
    const { handleConfirmPay } = useShowMaskEffect(showToast);
    return {
      handlePlaceOrder,
      handleConfirmPay,
      order,
      showConfirm,
      calculations,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@media screen and(max-width: 600px) {
  .order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    background: $bgColor;
    &__price {
      flex: 1;
      text-indent: 0.24rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__btn {
      width: 0.98rem;
      background: #4fb0f9;
      color: #fff;
      text-align: center;
      font-size: 0.14rem;
    }
  }
  .mask {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3rem;
      height: 1.56rem;
      background: #fff;
      text-align: center;
      border-radius: 0.04rem;
      &__title {
        margin: 0.24rem 0 0 0;
        line-height: 0.26rem;
        font-size: 0.18rem;
        color: #333;
      }
      &__desc {
        margin: 0.08rem 0 0 0;
        font-size: 0.14rem;
        color: #666666;
      }
      &__btns {
        display: flex;
        margin: 0.24rem 0.58rem;
      }
      &__btn {
        flex: 1;
        width: 1rem;
        line-height: 0.32rem;
        border-radius: 0.16rem;
        font-size: 0.14rem;
        &--first {
          margin-right: 0.12rem;
          border: 0.01rem solid #4fb0f9;
          color: #4fb0f9;
        }
        &--last {
          margin-left: 0.12rem;
          background: #4fb0f9;
          color: #fff;
        }
      }
    }
  }
}
@media screen and(min-width: 600px) {
  .order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 49px;
    line-height: 49px;
    background: $bgColor;
    &__price {
      flex: 1;
      text-indent: 24px;
      font-size: 14px;
      color: $content-fontcolor;
    }
    &__btn {
      width: 98px;
      background: #4fb0f9;
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
  .mask {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 156px;
      background: #fff;
      text-align: center;
      border-radius: 4px;
      &__title {
        margin: 24px 0 0 0;
        line-height: 26px;
        font-size: 18px;
        color: #333;
      }
      &__desc {
        margin: 8px 0 0 0;
        font-size: 14px;
        color: #666666;
      }
      &__btns {
        display: flex;
        margin: 24px 58px;
      }
      &__btn {
        flex: 1;
        width: 100px;
        line-height: 32px;
        border-radius: 16px;
        font-size: 14px;
        &--first {
          margin-right: 12px;
          border: 1px solid #4fb0f9;
          color: #4fb0f9;
        }
        &--last {
          margin-left: 12px;
          background: #4fb0f9;
          color: #fff;
        }
      }
    }
  }
}
</style>
