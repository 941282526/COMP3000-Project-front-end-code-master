<template>
  <div class="wrapper">
    <newTitle />
    <div class="bg"></div>
    <div class="person_edit" @click="handleEditClick">
      <img src="../../assets/editor.png" alt="fail" />
    </div>
    <div class="person">
      <div class="person__info">
        <!-- 有头像则显示头像 -->
        <div class="person__info__avatar" v-if="userInfo.headPortrait">
          <img :src="userInfo.headPortrait" alt="fail" />
        </div>
        <!-- 没有就显示默认 -->
        <div class="person__info__avatar" v-else>
          <img
            src="https://images.gaoshiyi.top/static/user.png"
            alt="fail"
          />
        </div>
        <div class="person__info__title">
          <div class="person__info__title__nick">
            nickname：{{ userInfo.nickname ?? "Not set" }}
          </div>
        </div>
        <div class="person__info__money">
          <div class="info">
            <div class="title">Red envelope</div>
            <div class="num">{{ userInfo.money ?? 0 }}</div>
          </div>
          <div class="info">
            <div class="title">coupon</div>
            <div class="num">{{ userInfo.coupons ?? 0 }}</div>
          </div>
          <div class="info">
            <div class="title">Gold coin</div>
            <div class="num">{{ userInfo.goldCoin ?? 0 }}</div>
          </div>
          <div class="info">
            <div class="title">White bar</div>
            <div class="num">{{ userInfo.iou ?? 0 }}</div>
          </div>
        </div>
      </div>
      <div class="person__menu">
        <div class="person__menu__list" @click="handleRouteClick('address')">
          <div class="person__menu__list__con">
            <div><img src="../../assets/address.png" alt="fail" /></div>
            <p>My address</p>
          </div>
          <div class="person__menu__list__more iconfont">&#xe6f2;</div>
        </div>
        <div
          class="person__menu__list"
          @click="handleRouteClick('editPassword')"
        >
          <div class="person__menu__list__con">
            <div>
              <img src="../../assets/editPassword.png" alt="fail" />
            </div>
            <p>Change password</p>
          </div>
          <div class="person__menu__list__more iconfont">&#xe6f2;</div>
        </div>
        <!--        <div class="person__menu__list" @click="handleRouteClick('wechatAuth')">-->
        <!--          <div class="person__menu__list__con">-->
        <!--            <div><img src="../../assets/wechat.png" alt="图片加载失败" /></div>-->
        <!--            <p>绑定微信</p>-->
        <!--          </div>-->
        <!--          <div class="person__menu__list__more iconfont">&#xe6f2;</div>-->
        <!--        </div>-->
      </div>
      <div class="logout" @click="handleLogoutClick">Log out</div>
      <div style="width: 100%; text-align: center;">
        <span class="new-logout" @click="handleLogoutClick">Log out</span>
      </div>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
  <Docker :currentIndex="3" />
</template>

<script>
import { useRouter } from "vue-router";
import Docker from "@/components/Docker";

import newTitle from "@/components/newTitle";
import Toast, { useToastEffect } from "../../components/Toast";

const useMyEffect = (showToast, userInfo) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push({ name: "Edit" });
  };

  const handleRouteClick = (path) => {
    switch (path) {
      case "address":
        router.push({ name: "Address" });
        break;
      case "editPassword":
        router.push({ name: "EditPassword" });
        break;
      case "wechatAuth":
        if (userInfo.openId != null) {
          showToast("The user has been bound to a wechat account");
          return;
        }
        router.push({ name: "WechatAuth" });
        break;
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userInfo");
    router.replace({ name: "Home" });
  };
  return { handleEditClick, handleRouteClick, handleLogoutClick };
};

export default {
  name: "my",
  components: { Docker, Toast, newTitle },
  setup() {
    //获取缓存
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { show, toastMessage, showToast } = useToastEffect();
    const { handleEditClick, handleRouteClick, handleLogoutClick } =
      useMyEffect(showToast, userInfo);
    return {
      userInfo,
      handleEditClick,
      handleRouteClick,
      handleLogoutClick,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: rgb(248, 248, 248);
  }
  .bg {
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
  }
  .person {
    position: absolute;
    top: 1.08rem;
    left: 0;
    right: 0;
    height: 2.03rem;
    &__info {
      position: relative;
      margin: auto;
      width: 3.39rem;
      height: 2.03rem;
      border-radius: 0.1rem;
      background-color: #ffffff;
      &__avatar {
        position: absolute;
        top: -0.48rem;
        left: 50%;
        margin-left: -0.48rem;
        height: 0.94rem;
        width: 0.94rem;
        border-radius: 50%;
        background-color: #ffffff;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      &__title {
        position: absolute;
        top: 0.62rem;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &__nick {
          height: 0.36rem;
          width: 1.7rem;
          font-size: 0.18rem;
          line-height: 0.36rem;
          color: #262628;
          text-align: center;
          padding-bottom: 0.05rem;
        }
      }
      &__money {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.7rem;
        border-top: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info {
          width: 25%;
          height: 0.7rem;
          .title {
            color: #c1c0c9;
            font-size: 0.12rem;
            margin-top: 0.1rem;
            text-align: center;
          }
          .num {
            font-size: 0.2rem;
            color: #262628;
            text-align: center;
            margin-top: 0.1rem;
          }
        }
      }
    }
    &__menu {
      position: relative;
      margin: auto;
      top: 0.2rem;
      width: 3.39rem;
      border-radius: 0.1rem;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &__list {
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__con {
          width: 1.5rem;
          height: 0.25rem;
          padding-left: 0.16rem;
          display: flex;
          align-items: center;
          div {
            height: 0.2rem;
            width: 0.2rem;
            border-radius: 8px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          p {
            font-size: 0.14rem;
            color: #262626;
            margin-left: 0.1rem;
          }
        }
        &__more {
          height: 0.25rem;
          line-height: 0.25rem;
          transform: rotate(180deg);
          color: #c2c4ca;
        }
      }
    }
  }
  .person_edit {
    position: absolute;
    top: 0.6rem;
    right: 0.2rem;
    z-index: 999;
    width: 0.3rem;
    height: 0.3rem;
    img {
      width: 100%;
    }
  }
  .new-logout{
    display: none;
  }
  .logout {
    margin: 1rem 0.1rem;
    height: 0.5rem;
    background: #0091ff;
    color: white;
    font-size: 0.2rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.2rem;
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
  .bg {
    height: 250px;
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
  }
  .person {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    &__info {
      position: relative;
      margin: auto;
      width: 339px;
      height: 203px;
      border-radius: 10px;
      background-color: #ffffff;
      &__avatar {
        position: absolute;
        top: -48px;
        left: 50%;
        margin-left: -48px;
        height: 94px;
        width: 94px;
        border-radius: 50%;
        background-color: #ffffff;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      &__title {
        position: absolute;
        top: 62px;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &__nick {
          height: 36px;
          width: 170px;
          font-size: 18px;
          line-height: 36px;
          color: #262628;
          text-align: center;
          padding-bottom: 5px;
        }
      }
      &__money {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 70px;
        border-top: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info {
          width: 25%;
          height: 70px;
          .title {
            color: #c1c0c9;
            font-size: 12px;
            margin-top: 10px;
            text-align: center;
          }
          .num {
            font-size: 20px;
            color: #262628;
            text-align: center;
            margin-top: 10px;
          }
        }
      }
    }
    &__menu {
      position: relative;
      margin: auto;
      top: 20px;
      width: 339px;
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &__list {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__con {
          width: 150px;
          height: 25px;
          padding-left: 16px;
          display: flex;
          align-items: center;
          div {
            height: 20px;
            width: 20px;
            border-radius: 8px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          p {
            font-size: 14px;
            color: #262626;
            margin-left: 10px;
          }
        }
        &__more {
          height: 25px;
          line-height: 25px;
          transform: rotate(180deg);
          color: #c2c4ca;
        }
      }
    }
  }
  .person_edit {
    position: absolute;
    top: 60px;
    right: 20px;
    z-index: 999;
    width: 30px;
    height: 30px;
    img {
      width: 100%;
    }
  }

  .new-logout {
    margin: 50px 10px;
    height: 30px;
    width: 400px;
    padding: 10px;
    background: #0091ff;
    color: white;
    font-size: 20px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    border-radius: 20px;
  }
  .logout {
    display: none;
  }
}
</style>
