<template>
  <div class="nav_title">
    <div class="nav_logo">
      <img src="../../public/editfile/logo.png" alt="" srcset="">
    </div>
    <span class="logo_title">restaurant assistant</span>
    <div class="nav-menus">
      <div v-for="(item, index) in dockerList" :key="index" class="menu_item" @click="goRouter(item)">
        {{ item.text }}
      </div>
    </div>
    <div class="menu-resign" @click="goRegister">
      <span v-if="username">Username：{{ username }}</span>
      <span v-if="!username" class="iconfont" v-html="'&#xe751;'"></span>
      <span v-if="!username">Login</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      dockerList: [
        { icon: "&#xe751;", text: "Home", to: { name: "Home" } },
        { icon: "&#xe899;", text: "Shopping cart", to: { name: "CartList" } },
        { icon: "&#xe737;", text: "Order", to: { name: "OrderList" } },
        { icon: "&#xe600;", text: "My", to: { name: "My" } },
      ]
    }
  },
  mounted() {
    this.username = ''
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
    console.log(userInfo, "userInfo")
    if (userInfo) {
      this.username = userInfo.nickname
    }
  },
  methods: {
    goRouter(item) {
      console.log(item, 'item')
      if (item.to.name == "Home") {
        this.$router.push({
          name: "Home"
        })
      } else if (item.to.name == "CartList") {
        this.$router.push({
          name: "CartList"
        })
      } else if (item.to.name == "OrderList") {
        this.$router.push({
          name: "OrderList"
        })
      } else if (item.to.name == "My") {
        this.$router.push({
          name: "My"
        })
      }
    },
    goRegister() {
      console.log(111, '点击了注册1')
      this.$router.push({
        path: "/login"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .nav_title{
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 10px;
    z-index: 2000;
    height: 80px;
    width: calc(100% - 20px);
    display: inline-flex;
    align-items: center;
    .nav_logo{
      img{
        max-width: 160px;
      }
    }
    .logo_title{
      font-size: 16px;
      margin-left: -20px;
      width: 180px;
      display: inline-block;
    }
    .nav-menus{
      display: inline-flex;
      color: #000;
      align-items: center;
      font-size: 15px;
      width: 85%;
      .menu_item{
        width: 140px;
        text-align: center;
        color: #00a94f;
        cursor: pointer;
      }
    }
    .menu-resign{
      float: right;
      font-size: 15px;
      width: 150px;
      .iconfont{
        margin-right: 5px; 
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .nav_title{
    display: none;
  }
}

</style>