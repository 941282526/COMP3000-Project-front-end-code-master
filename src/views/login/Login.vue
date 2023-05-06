<template>
  <newTitle />
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="https://images.gaoshiyi.top/static/user.png"
      alt="fail"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="Please enter the account number."
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="Please enter password"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">Login</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">register</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import newTitle from "@/components/newTitle";
import request from "@/utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
import axios from "axios";

//处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const result = await request.post("/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result.message === "success" && result.code === 0) {
        //保存用户信息及登陆状态
        localStorage.userInfo = JSON.stringify(result.data);
        localStorage.isLogin = true;
        console.log(result.data.token);
        axios.defaults.headers["token"] = result.data.token;

        await router.push({ name: "Home" });
      } else {
        showToast(result.message);
      }
    } catch (e) {
      showToast("请求失败");
    }
  };

  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};

export default {
  name: "Login",
  components: { Toast, newTitle },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = useRegisterEffect();

    return {
      username,
      password,
      show,
      toastMessage,
      handleLogin,
      handleRegisterClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@media screen and(max-width: 600px) {
  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
      display: block;
      margin: 0 auto 0.4rem auto;
      width: 0.66rem;
      height: 0.66rem;
    }
    &__input {
      height: 0.48rem;
      margin: 0 0.4rem 0.16rem 0.4rem;
      padding: 0 0.16rem;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;

      &__content {
        margin-top: 0.12rem;
        line-height: 0.22rem;
        border: none;
        outline: none;
        width: 100%;
        background: none;
        font-size: 0.16rem;
        color: $content-notice-fontcolor;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__login-button {
      margin: 0.32rem 0.4rem 0.16rem 0.4rem;
      line-height: 0.48rem;
      background: #0091ff;
      box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
      border-radius: 0.04rem;
      color: #fff;
      font-size: 0.16rem;
      text-align: center;
    }
    &__login-link {
      text-align: center;
      font-size: 0.14rem;
      color: $content-notice-fontcolor;
    }
  }
}
@media screen and(min-width: 600px) {
  .wrapper {
    position: absolute;
    width: 50%;
    top: 50%;
    left: 25%;
    right: 0;
    transform: translateY(-50%);
    &__img {
      display: block;
      margin: 0 auto 40px auto;
      width: 66px;
      height: 66px;
    }
    &__input {
      height: 48px;
      margin: 0 40px 16px 40px;
      padding: 0 16px;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;

      &__content {
        margin-top: 12px;
        line-height: 22px;
        vertical-align: top;
        border: none;
        outline: none;
        width: 100%;
        background: none;
        font-size: 16px;
        color: $content-notice-fontcolor;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__login-button {
      margin: 32px 40px 16px 40px;
      line-height: 48px;
      background: #0091ff;
      box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
    &__login-link {
      text-align: center;
      font-size: 14px;
      color: $content-notice-fontcolor;
    }
  }
}

</style>
