<template>
  <div class="wrapper">
    <div class="title">
      <div class="title__back iconfont" @click="handleBackClick">&#xe697;</div>
      <div class="title__content">
        <div class="title__content__info">Edit user information</div>
      </div>
    </div>
    <div class="userInfo">
      <div class="userInfo__item">
        <div class="userInfo__item__title">nickname：</div>
        <input
          type="text"
          placeholder="2 to 12 digits, letters, and underscores"
          v-model="nickname"
        />
      </div>
      <div class="userInfo__item">
        <div class="userInfo__item__title">telephone：</div>
        <input type="text" placeholder="11-digit phone number" v-model="tel" />
      </div>
    </div>
    <div class="save" @click="handleSaveClick">save</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import request from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useUserInfoEffect = (showToast) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  //获取缓存
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //保存信息
  let data = reactive({
    nickname: userInfo.nickname,
    tel: userInfo.tel,
  });

  const handleSaveClick = async () => {
    //发送请求
    const result = await request.post("/user/updateUserInfo", {
      id: userInfo.id,
      nickname: data.nickname,
      tel: data.tel,
    });

    if (result.message === "success" && result.code === 0) {
      //成功则保存用户信息
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      await router.push({ name: "My" });
    } else {
      showToast(result.message);
    }
  };

  const { nickname, tel } = toRefs(data);

  return {
    nickname,
    tel,
    handleBackClick,
    handleSaveClick,
  };
};

export default {
  name: "edit",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { nickname, tel, handleBackClick, handleSaveClick } =
      useUserInfoEffect(showToast);
    return {
      nickname,
      tel,
      handleBackClick,
      handleSaveClick,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@media screen and (max-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: #f5f5f5;
  }
  .title {
    display: flex;
    padding: 0 0.18rem;
    line-height: 0.44rem;
    height: 0.44rem;
    background-color: #ffffff;
    &__back {
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      color: #333333;
      &__info {
        flex: 1;
        text-align: center;
        font-size: 0.16rem;
      }
      &__more {
        font-size: 0.14rem;
      }
    }
  }
  .userInfo {
    padding: 0 0.18rem;
    margin-top: 0.12rem;
    &__item {
      padding: 0.18rem 0.12rem;
      height: 0.4rem;
      margin-bottom: 0.1rem;
      font-size: 0.18rem;
      display: flex;
      background-color: #ffffff;
      border-radius: 0.2rem;
      &__title {
        color: #666666;
        line-height: 0.4rem;
        height: 0.4rem;
        text-align: center;
      }
      input {
        color: #999;
        height: 0.4rem;
        border: 0 solid #3a91f3;
        ::placeholder {
          //通过这个设置
          color: #999; //如果有时不生效 有可能是权限不够 加一个!important 即可
        }
      }
    }
  }
  .save {
    margin: 0.3rem 0.1rem;
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
    background: #f5f5f5;
  }
  .title {
    display: flex;
    padding: 0 18px;
    line-height: 44px;
    height: 44px;
    background-color: #ffffff;
    &__back {
      width: 30px;
      font-size: 24px;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      color: #333333;
      &__info {
        flex: 1;
        text-align: center;
        font-size: 16px;
      }
      &__more {
        font-size: 14px;
      }
    }
  }
  .userInfo {
    padding: 0 18px;
    margin-top: 12px;
    &__item {
      padding: 18px 12px;
      height: 40px;
      margin-bottom: 10px;
      font-size: 18px;
      display: flex;
      background-color: #ffffff;
      border-radius: 20px;
      &__title {
        color: #666666;
        line-height: 40px;
        height: 40px;
        text-align: center;
      }
      input {
        color: #999;
        height: 40px;
        border: 0 solid #3a91f3;
        ::placeholder {
          //通过这个设置
          color: #999; //如果有时不生效 有可能是权限不够 加一个!important 即可
        }
      }
    }
  }
  .save {
    margin: 30px 10px;
    height: 50px;
    background: #0091ff;
    color: white;
    font-size:20px;
    line-height: 50px;
    text-align: center;
    border-radius:20px;
  }
}

</style>
