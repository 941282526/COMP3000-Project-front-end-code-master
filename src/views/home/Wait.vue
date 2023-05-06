<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe697;
      </div>
      Current row number
    </div>
  </div>
  <div style="width: 100%; margin-top: 120px">
    <el-row
      class="mb-4"
      style="width: 100%; text-align: center; position: absolute"
    >
      <el-button style="" type="warning" class="main_but" round> <span style="font-size: 26px;">{{sort}}</span> </el-button>
    </el-row>
  </div>
  <div style="margin-top: 40px">
    <el-row
      class="mb-4"
      style="
        width: 100%;
        text-align: center;
        position: absolute;
        margin-top: 100px;
      "
    >
      <el-button
        type="danger"
        style="height: 40px; width: 80px"
        @click="handleBackHome"
        round
      >
      cancel
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { ElButton, ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import request from "@/utils/request";

const sort = ref();
export const handler = () => {
  const route = useRoute();
  sort.value = `${route.params.sort}`;

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleBackHome = () => {
    ElMessageBox.confirm("是否确定取消当前排号?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(() => {
        request.get("/dinner/dinnerUpdateStatus", {
          status: 3,
        });
        router.push({ name: "Home" });
      })
      .catch(() => {});
  };
  return {
    handleBackClick,
    handleBackHome,
    sort,
  };
};

export default {
  name: "Wait",
  components: { ElButton },
  setup() {
    const { handleBackClick, handleBackHome, sort } = handler();
    return {
      handleBackClick,
      handleBackHome,
      sort,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
@media screen and(max-width: 600px) {
  
  .main_but {
    --el-border-radius-round: 80px;
    height: 80px;
    width: 80px;
  }
  .top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
    background-repeat: no-repeat;

    &__header {
      position: relative;
      padding-top: 0.2rem;
      line-height: 0.24rem;
      color: $bgColor;
      text-align: center;
      font-size: 0.16rem;

      &__back {
        position: absolute;
        left: 0.18rem;
        font-size: 0.22rem;
      }
    }

    &__receiver {
      position: absolute;
      left: 0.18rem;
      right: 0.18rem;
      bottom: 0;
      height: 1.2rem;
      background: $bgColor;
      border-radius: 0.04rem;

      &__title {
        line-height: 0.22rem;
        padding: 0.16rem 0 0.14rem 0.16rem;
        font-size: 0.16rem;
        color: $content-fontcolor;
      }

      &__address {
        line-height: 0.2rem;
        padding: 0 0.4rem 0 0.16rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
      }

      &__info {
        padding: 0.06rem 0 0 0.16rem;

        &__name {
          margin-right: 0.06rem;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: $medium-fontColor;
        }
      }

      &__icon {
        transform: rotate(180deg);
        position: absolute;
        right: 0.16rem;
        top: 0.5rem;
        color: $medium-fontColor;
        font-size: 0.2rem;
      }
    }
  }
}
@media screen and(min-width: 600px) {
  .main_but {
    --el-border-radius-round: 80px;
    height: 80px;
    width: 80px;
  }
  .top {
    position: relative;
    height: 196px;
    background-size: 100% 159px;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
    background-repeat: no-repeat;

    &__header {
      position: relative;
      padding-top: 20px;
      line-height: 24px;
      color: $bgColor;
      text-align: center;
      font-size: 16px;

      &__back {
        position: absolute;
        left: 18px;
        font-size: 22px;
      }
    }

    &__receiver {
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 0;
      height: 120px;
      background: $bgColor;
      border-radius: 4px;

      &__title {
        line-height: 22px;
        padding: 16px 0 14px 16px;
        font-size: 16px;
        color: $content-fontcolor;
      }

      &__address {
        line-height: 20px;
        padding: 0 40px 0 16px;
        font-size: 14px;
        color: $content-fontcolor;
      }

      &__info {
        padding: 6px 0 0 16px;

        &__name {
          margin-right: 6px;
          line-height: 18px;
          font-size: 12px;
          color: $medium-fontColor;
        }
      }

      &__icon {
        transform: rotate(180deg);
        position: absolute;
        right: 16px;
        top: 50px;
        color: $medium-fontColor;
        font-size: 20px;
      }
    }
  }
}
</style>
