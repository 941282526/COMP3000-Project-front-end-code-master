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
        placeholder="Please enter the user name"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="Please enter password"
        type="password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="Confirm password"
        type="password"
        v-model="rePassword"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">register</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      Have an account to log in
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import newTitle from "@/components/newTitle";
import { reactive, toRefs } from "vue";
import request from "@/utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

//处理注册逻辑
const useRegisterEffect = (showToast) => {
  const data = reactive({
    username: "",
    password: "",
    rePassword: "",
  });
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const result = await request.post("/user/register", {
        username: data.username,
        password: data.password,
        rePassword: data.rePassword,
      });
      if (result.message === "success" && result.code === 0) {
        await router.push({ name: "Login" });
      } else {
        showToast(result.message);
      }
    } catch (e) {
      showToast("Request failure");
    }
  };

  const { username, password, rePassword } = toRefs(data);
  return { username, password, rePassword, handleRegister };
};

//处理登陆跳转
const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  components: { Toast, newTitle },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, rePassword, handleRegister } =
      useRegisterEffect(showToast);
    const { handleLoginClick } = useLoginEffect();
    return {
      username,
      password,
      rePassword,
      show,
      toastMessage,
      handleRegister,
      handleLoginClick,
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
        line-height: 0.48rem;
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
    &__register-button {
      margin: 0.32rem 0.4rem 0.16rem 0.4rem;
      line-height: 0.48rem;
      background: #0091ff;
      box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
      border-radius: 0.04rem;
      color: #fff;
      font-size: 0.16rem;
      text-align: center;
    }
    &__register-link {
      text-align: center;
      font-size: 0.14rem;
      color: $content-notice-fontcolor;
    }
  }
}
@media screen and(min-width: 600px) {
  .wrapper {
    position: absolute;
    top: 50%;
    left: 25%;
    width: 50%;
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
        line-height: 24px;
        border: none;
        outline: none;
        vertical-align: top;
        width: 100%;
        background: none;
        font-size: 16px;
        color: $content-notice-fontcolor;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__register-button {
      margin: 32px 40px 16px 40px;
      line-height: 48px;
      background: #0091ff;
      box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
    &__register-link {
      text-align: center;
      font-size: 14px;
      color: $content-notice-fontcolor;
    }
  }
}
</style>
