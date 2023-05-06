<template>
  <div class="nav_login">
    <div class="login-content">
      <div class="container">
        <h1>登录用户</h1>
        <p>请您登录用户，以便于您方便点餐</p>
        <div class="wrapper__input">
          <input
            class="wrapper__input__content"
            placeholder="请输入账号"
            v-model="username"
          />
        </div>
        <div class="wrapper__input">
          <input
            class="wrapper__input__content"
            type="password"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>
        <div style="text-align: center">
          <div class="wrapper__login-button" @click="handleLogin">登陆</div>
        </div>
        <div style="text-align: center">
          <div class="wrapper__login-button" @click="handleRegisterClick">立即注册</div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleLogin() {
      this.$router.push({
        path: "/login"
      })
    },
    handleRegisterClick() {
      this.$router.push({
        path: "/register"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .nav_login{
    padding: 10px;
    box-sizing: border-box;
    background: url('../../public/act.jpg');
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    .login-content{
      width: 100%;
      .container{
        width: 100%;
        text-align: center;
      }
      h1{
        font-size: 40px;
        color: #fff;
      }
      p{
        font-size: 20px;
        color: #fff;
      }
      .wrapper__input{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .wrapper__input__content{
        border-radius: 4px;
      }
      .wrapper__login-button{
        width: 200px;
        font-size: 20px;
        border-radius: 4px;
        background-color: #409eff;
        color: #fff;
        display: inline-block;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .nav_login{
    display: none;
  }
}
</style>