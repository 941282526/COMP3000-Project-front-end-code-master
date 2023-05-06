<template>
  <!-- 顶部地区 -->
  <div class="position">
    <!--    <span class="iconfont position__icon">&#xe614;</span>-->
    <!--    XXX-->
<!--    <div class="search">-->
<!--      <span class="iconfont">&#xe752;</span>-->
<!--      <span class="search__text">搜索热门菜品</span>-->
<!--    </div>-->
<!--    <span class="iconfont position_notice">&#xe62f;</span>-->
  </div>
  <!--  &lt;!&ndash; 搜索及banner &ndash;&gt;-->
  <!--  <div class="banner">-->
  <!--    <img-->
  <!--      class="banner__img"-->
  <!--      src="https://images.gaoshiyi.top/static/banner.jpg"-->
  <!--      alt="图片加载失败"-->
  <!--    />-->
  <!--  </div>-->
  <!-- nav      v-for="item in categories" @click="handleClick()-->
  <!--      :key="item.id"-->
  <!-- <div class="part_title">快捷订餐</div> -->
  <div class="main_button">
    <el-row class="mb-4">
      <el-button type="primary" class="main_but" round @click="handleDinner(0)">
        Order
      </el-button>
      <el-button type="success" class="main_but" round @click="handleDinner(1)">
        Make an order
      </el-button>
      <el-button type="warning" class="main_but" round @click="handleDinner(3)">
        take-out
      </el-button>
    </el-row>
  </div>
  <div class="icons">
    <div class="icons__item">
      <!--      <img class="icons__item__img" :src="item.imgUrl" alt="" />-->
      <!--      <p class="icons__item__desc">{{ item.name }}</p>-->
    </div>
  </div>
  <div class="gap"></div>
  <div class="transverse_line"></div>
</template>

<script>
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";
import request from "@/utils/request";

export const handler = () => {
  const router = useRouter();
  const handleDinner = async (pre) => {
    const result = await request.get("/dinner/dinnerQueueNumber");
    if (result.message === "success") {
      const number = result.data;
      if( pre === 3 ){
        if (number === null) {
          await router.push({ path: "/shop/1" });
        } else {
          await router.push({ name: "In" });
        }
      } else {
        if (number === null) {
          await router.push({ path: "/preDinner/" + pre });
        } else if (number === 9999) {
          await router.push({ name: "In" });
        } else if (number <= 0) {
          await router.push({ path: "/shop/1" });
        } else {
          console.log("/wait/" + number)
          await router.push({ path: "/wait/" + number });
        }
      }
    } else if( result.code === 40008 ){
      await router.push({ name: "Login" });
    }
  };
  return {
    handleDinner,
  };
};

export default {
  name: "StaticPart",
  components: { ElButton },
  setup() {
    const { handleDinner } = handler();
    return { handleDinner };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
a {
  text-decoration: none;
  color: white;
}
@media screen and (min-width: 600px) {
  .position {
    position: relative;
    padding: 20px 0 0 0;
    @include ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .position__icon {
      color: blue;
      position: relative;
      top: 0.01rem;
      font-size: 0.2rem;
    }
    .position_notice {
      position: absolute;
      right: 0;
      top: 0.22rem;
      font-size: 0.2rem;
    }
    color: $content-fontcolor;
  }
  .main_button{
    height: calc(100% - 120px);
    background: url('../../../public/editfile/shouye.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .part_title{
    width: 100%;
    text-align: center;
  }
  .main_but {
    margin-left: 40px;
    --el-border-radius-round: 160px;
    height: 160px;
    width: 160px;
  }
  .transverse_line{
    border-bottom: 1px solid #999;
    margin-top: 60px;
  }
}
@media screen and (max-width: 600px) {
  .position {
    position: relative;
    padding: 0.16rem 0.24rem 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    @include ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .position__icon {
      color: blue;
      position: relative;
      top: 0.01rem;
      font-size: 0.2rem;
    }
    .main_button{
      display: none;
    }
    .position_notice {
      position: absolute;
      right: 0;
      top: 0.22rem;
      font-size: 0.2rem;
    }
    color: $content-fontcolor;
  }
  .main_but {
    margin-left: 0.25rem;
    --el-border-radius-round: 80px;
    height: 80px;
    width: 80px;
  }
  //.main_but :active {
  //  --el-border-radius-round: 80px;
  //  height: 80px;
  //  width: 80px;
  //}
  // 搜索及banner
  .search {
    margin-bottom: 0.12rem;
    line-height: 0.32rem;
    background: $search-bgColor;
    color: $search-fontColor;
    border-radius: 0.16rem;
    .iconfont {
      display: inline-block;
      padding: 0 0.08rem 0 0.16rem;
      font-size: 0.16rem;
    }
    &__text {
      display: inline-block;
      font-size: 0.14rem;
    }
  }
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
  }
  // nav
  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.16rem;
    &__item {
      width: 20%;
      &__img {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
      }
      &__desc {
        margin: 0.06rem 0 0.16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
  .gap {
    margin: 0 -0.18rem;
    height: 0.1rem;
    background: $content-bgColor;
  }
}
// 顶部地区

</style>
