<template>
  <!-- 主体内容 -->
  <div class="nearby">
    <h3 class="nearby__title">Popular dishes</h3>
    <router-link to v-for="item in nearbyList" :key="item.id">
      <HotProduct :item="item" />
    </router-link>
    <Toast v-if="show" :message="toastMessage" />
    <div class="load-more" v-if="flag" @click="loadMore">Click load more</div>
    <div class="load-more" v-else>No more</div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import request from "../../utils/request";
import HotProduct from "../../components/HotProduct";
import Toast, { useToastEffect } from "../../components/Toast";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const page = ref(1);
  // const size = 10;
  const flag = ref(true);

  const getNearbyList = async () => {
    const result = await request.get("/product/hot/1", {});
    if (result.message === "success" && result.data.length > 0) {
      nearbyList.value = [...nearbyList.value, ...result.data];
      // if (result.data.length >= size && page.value >= 2) {
      //   showToast("加载更多...");
      // } else if (result.data.length < size) {
      //   flag.value = false;
      //   showToast("没有更多了");
      // }
    }
  };

  //不需要指定监听的属性,当page.value属性变更的时候，这个回调都会执行
  watchEffect(() => {
    getNearbyList();
  });

  //这里需要定义page分页的发生变化
  const loadMore = () => {
    page.value++;
  };

  return { nearbyList, loadMore, flag };
};

export default {
  name: "Nearby",
  components: { HotProduct, Toast },
  setup() {
    const { show, toastMessage } = useToastEffect();
    const { nearbyList, loadMore, flag } = useNearbyListEffect();

    return { nearbyList, loadMore, flag, show, toastMessage };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@media screen and (min-width: 600px) {
  // 主体内容
  .nearby {
    &__title {
      text-align: center;
      font-weight: normal;
      color: $content-fontcolor;
    }
    a {
      text-decoration: none;
    }
  }
  .load-more {
    margin: 0.16rem 0 0.1rem 0;
    text-align: center;
    height: 0.1rem;
    line-height: 0.1rem;
    color: $content-fontcolor;
  }
}
@media screen and (max-width: 600px) {
  // 主体内容
  .nearby {
    &__title {
      margin: 0.16rem 0 0.02rem 0;
      font-size: 0.18rem;
      font-weight: normal;
      color: $content-fontcolor;
    }
    a {
      text-decoration: none;
    }
  }
  .load-more {
    margin: 0.16rem 0 0.1rem 0;
    text-align: center;
    height: 0.1rem;
    line-height: 0.1rem;
    color: $content-fontcolor;
  }
}

</style>
