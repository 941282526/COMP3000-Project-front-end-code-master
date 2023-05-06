<template>
  <div class="wrapper">
    <newTitle />
    <div class="title">My order</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title iconfont">
          <router-link :to="`/shop/${item.shopId}`">
            &#xe736; {{ item.shopName }} &#xe6af;
          </router-link>
          <span class="order__status">
            <!-- 调用定义的方法 根据订单状态枚举值返回message -->
            {{ orderStateEnum(item.orderState) }}
          </span>
        </div>
        <!-- 订单产品 -->
        <div
          class="products"
          v-for="(detail, detailId) in item.orderDetailList"
          :key="detailId"
          @click="handleOrderDetailClick(item)"
        >
          <div class="products__item">
            <img class="products__item__img" :src="detail.imgUrl" alt="fail" />
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ detail.name }}</h4>
              <p class="products__item__price">
                <span>
                  <span class="products__item__yen"> £ </span>
                  {{ detail.price }} x {{ detail.quantity }}
                </span>
                <span class="products__item__total">
                  <span class="products__item__yen"> £</span>
                  {{ detail.price * detail.quantity }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <!-- /订单产品 -->

        <!-- 订单总价 件数 -->
        <div class="order__price">£ {{ item.totalPrice }}</div>
        <div class="order__count">total {{ item.totalCount }} price</div>
        <!-- /订单总价 件数 -->

        <!-- 订单操作按钮 -->
        <div class="order-button">
          <!-- orderState值为0时 代表未支付 待确认 显示取消按钮和支付按钮 -->
          <button
            type="button"
            class="operation"
            v-if="item.orderState === 0"
            @click="handleOrderClick('cancel', item)"
          >
            Cancel
          </button>
          <button
            type="button"
            class="operation"
            v-if="item.orderState === 0"
            @click="handleOrderClick('pay', item)"
          >
            Pay
          </button>
          <!-- orderState值为3时 代表 已支付未发货 显示退款按钮 -->
          <button
            type="button"
            class="operation"
            v-if="item.orderState === 3"
            @click="handleOrderClick('refund', item)"
          >
          refund
          </button>
          <!-- orderState值为5时 代表 已运抵 显示确认收货按钮 -->
          <button
            type="button"
            class="operation"
            v-if="item.orderState === 5"
            @click="handleOrderClick('finish', item)"
          >
          Confirm
          </button>
          <!-- orderState值为6时 代表 订单已完成 显示评价订单按钮 -->
          <button
            type="button"
            class="operation"
            v-if="item.orderState === 6"
            @click="handleOrderClick('rating', item)"
          >
          evaluation
          </button>
        </div>
        <!-- /订单操作按钮 -->
      </div>
      <div class="load-more" v-if="flag" @click="loadMore">Click load more</div>
      <div class="load-more" v-else>No more</div>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
  <Docker :currentIndex="2" />
</template>

<script>
import { ref, watchEffect } from "vue";

import newTitle from "@/components/newTitle";
import request from "../../utils/request";
import { useRouter } from "vue-router";
import Docker from "@/components/Docker";
import Toast, { useToastEffect } from "../../components/Toast";

// 处理订单列表逻辑
const useOrderListEffect = (showToast, userInfo) => {
  //定义方法 根据订单对象的枚举值返回枚举信息
  const orderStateEnum = (orderState) => {
    switch (orderState) {
      case 0:
        return "Unpaid to be confirmed";
      case 1:
        return "cancelled";
      case 2:
        return "refunded";
      case 3:
        return "Waiting for merchant delivery";
      case 4:
        return "In transit";
      case 5:
        return "Served, to be confirmed";
      case 6:
        return "Have completed";
    }
  };

  const list = ref([]);
  const page = ref(1);
  const size = 10;
  const flag = ref(true);
  const getUserOrderList = async () => {
    const result = await request.get("/user/order/all", {
      userId: userInfo.id,
      page: page.value,
      size: size,
    });
    if (result.message === "success" && result.code === 0) {
      const orderList = result.data;
      orderList.forEach((order) => {
        //计算商品总价和商品总件数
        let totalPrice = 0,
          totalCount = 0;
        order.orderDetailList.forEach((item) => {
          totalPrice += item.price * item.quantity;
          totalCount += item.quantity;
        });
        order.totalPrice = totalPrice.toFixed(2);
        order.totalCount = totalCount;
      });
      if (result.data.length >= size && page.value >= 2) {
        showToast("Load more...");
      } else if (result.data.length < size && page.value > 1) {
        flag.value = false;
        showToast("No more");
      }
      //将获取的新数据与之前的合并
      list.value = [...list.value, ...orderList];
    } else {
      showToast(result.message);
    }
  };

  //不需要指定监听的属性,当page.value属性变更的时候，这个回调都会执行
  watchEffect(() => {
    getUserOrderList();
  });

  //点击下载更多 异步获取下一页数据
  const loadMore = () => {
    page.value++;
  };

  return { list, loadMore, flag, orderStateEnum };
};

//订单操作按钮逻辑
const orderButtonEffect = (showToast, userInfo) => {
  const handleOrderClick = (action, item) => {
    switch (action) {
      case "pay":
        if (window.confirm("Are you sure you want to pay")) {
          //确认 发送异步支付订单
          const payOrder = async () => {
            const result = await request.post("/user/order/pay", {
              orderNumber: item.orderNumber,
              openId: userInfo.openId,
            });
            if (result.message === "success" && result.code === 0) {
              //支付成功 改变订单状态为已支付
              item.orderState = result.data.orderState;
              showToast("Order paid successfully");
            } else {
              showToast(result.message);
            }
          };
          payOrder();
        }
        break;
      case "cancel":
        if (window.confirm("Are you sure you want to cancel")) {
          //确认 发送异步取消订单
          const cancelOrder = async () => {
            const result = await request.post("/user/order/cancel", {
              orderNumber: item.orderNumber,
            });
            if (result.message === "success" && result.code === 0) {
              //取消成功 改变订单状态为已取消
              item.orderState = result.data.orderState;
              showToast("Successful cancellation of order");
            } else {
              showToast(result.message);
            }
          };
          cancelOrder();
        }
        break;
      case "finish":
        if (window.confirm("Have you confirmed receipt of the goods")) {
          //确认 发送异步确认收货 完成订单
          const finishOrder = async () => {
            const result = await request.post("/user/order/finish", {
              orderNumber: item.orderNumber,
            });
            if (result.message === "success" && result.code === 0) {
              //取消成功 改变订单状态为已完成
              item.orderState = result.data.orderState;
              showToast("Order completed");
            } else {
              showToast(result.message);
            }
          };
          finishOrder();
        }
        break;
      case "rating":
        showToast("To be perfected");
        break;
      case "refund":
        if (window.confirm("Are you sure you want a refund")) {
          //确认 发送异步操作退款
          const refundOrder = async () => {
            const result = await request.post("/user/order/refund", {
              orderNumber: item.orderNumber,
              openId: userInfo.openId,
            });
            if (result.message === "success" && result.code === 0) {
              //退款成功 改变订单状态为已完成
              item.orderState = result.data.orderState;
              showToast("The refund is successful. The payment is being processed");
            } else {
              showToast(result.message);
            }
          };
          refundOrder();
        }
        break;
    }
  };

  return { handleOrderClick };
};

//点击查看订单详情
const orderDetailEffect = () => {
  const router = useRouter();
  const handleOrderDetailClick = (item) => {
    router.push({
      name: "OrderDetail",
      query: { order: JSON.stringify(item) },
    });
  };
  return { handleOrderDetailClick };
};

export default {
  name: "OrderList",
  components: { Docker, Toast, newTitle },
  setup() {
    const userInfo = JSON.parse(localStorage.userInfo);
    const { show, toastMessage, showToast } = useToastEffect();
    const { handleOrderDetailClick } = orderDetailEffect();
    const { handleOrderClick } = orderButtonEffect(showToast, userInfo);
    const { list, loadMore, flag, orderStateEnum } = useOrderListEffect(
      showToast,
      userInfo
    );
    return {
      list,
      handleOrderClick,
      loadMore,
      flag,
      orderStateEnum,
      show,
      toastMessage,
      handleOrderDetailClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
@media screen and(max-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: rgb(248, 248, 248);
  }
  .title {
    line-height: 0.44rem;
    background: $bgColor;
    font-size: 0.16rem;
    color: $content-fontcolor;
    text-align: center;
  }
  .order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background: $bgColor;
    &__title {
      margin-bottom: 0.16rem;
      line-height: 0.22rem;
      font-size: 0.16rem;
      font-weight: 550;
      color: $content-fontcolor;
      a {
        color: $content-fontcolor;
        text-decoration: none;
      }
    }
    &__status {
      float: right;
      font-size: 0.14rem;
      color: $light-fontColor;
      a {
        color: red;
        text-decoration: none;
      }
    }
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 0.14rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      text-align: right;
    }
    .order-button {
      position: relative;
      width: 100%;
      height: 0.2rem;
      margin: 0.1rem 0 0 0.1rem;
      font-size: 0.12rem;
      .operation {
        color: black;
        height: 0.3rem;
        width: 0.65rem;
        margin-left: 0.1rem;
        background-color: white;
        border-radius: 0.6rem;
        border: 1px solid black;
        line-height: 0;
        float: right;
      }
    }
  }
  .products {
    background: $bgColor;
    padding-bottom: 0.15rem;
    &__item {
      position: relative;
      display: flex;
      justify-content: space-between;
      &__img {
        width: 0.5rem;
        height: 0.5rem;
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
        font-size: 0.18rem;
        color: $hightlight-fontColor;
      }
      &__yen {
        font-size: 0.12rem;
      }
    }
  }
  .load-more {
    text-align: center;
    font-size: 0.12rem;
    margin: 0.1rem 0 0.1rem 0;
  }
}
@media screen and (min-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgb(248, 248, 248);
  }
  .title {
    line-height: 40px;
    background: $bgColor;
    font-size: 16px;
    color: $content-fontcolor;
    text-align: center;
  }
  .order {
    margin: 16px 18px;
    padding: 16px;
    background: $bgColor;
    &__title {
      margin-bottom: 16px;
      line-height: 22px;
      font-size: 16px;
      font-weight: 550;
      color: $content-fontcolor;
      a {
        color: $content-fontcolor;
        text-decoration: none;
      }
    }
    &__status {
      float: right;
      font-size: 14px;
      color: $light-fontColor;
      a {
        color: red;
        text-decoration: none;
      }
    }
    &__price {
      margin-bottom: 4px;
      line-height: 20px;
      font-size: 14px;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 14px;
      font-size: 12px;
      color: $content-fontcolor;
      text-align: right;
    }
    .order-button {
      position: relative;
      width: 100%;
      height: 20px;
      margin: 10px 0 0 10px;
      font-size: 12px;
      .operation {
        color: black;
        height: 30px;
        width: 65px;
        margin-left: 10px;
        background-color: white;
        border-radius: 60px;
        border: 1px solid black;
        line-height: 26px;
        float: right;
      }
    }
  }
  .products {
    background: $bgColor;
    padding-bottom: 15px;
    &__item {
      position: relative;
      display: flex;
      justify-content: space-between;
      &__img {
        width: 50px;
        height: 50px;
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
        font-size: 18px;
        color: $hightlight-fontColor;
      }
      &__yen {
        font-size: 12px;
      }
    }
  }
  .load-more {
    text-align: center;
    font-size: 12px;
    margin: 10px 0 10px 0;
  }
}

</style>
