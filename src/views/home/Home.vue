<template>
  <div class="wrapper nearby">
    <newTitle />
    <router-link to v-for="item in list" :key="item.id">
      <ShopInfo :item="item" />
    </router-link>
    <div class="clearfix"></div>
    <!-- <newLogin /> -->
    <StaticPart />
    <Nearby />
  </div>
  <Docker class="docker_bottom" :currentIndex="0" />
</template>

<script>
import StaticPart from "./StaticPart";
import newTitle from "@/components/newTitle";
import Nearby from "./Nearby";
import Docker from "@/components/Docker";
import { useStore } from "vuex";
import ShopInfo from "@/components/ShopInfo";
import { ref } from "vue";
import request from "@/utils/request";

const handler = () => {
  const list = ref([]);
  const getNearbyList = async () => {
    const result = await request.get("/home/shop/1", {});
    if (result.message === "success") {
      list.value.push(result.data)
    } else if (result.code === 40008) {
      // eslint-disable-next-line no-undef
      await router.push({ name: "Login" });
    }
  };
  return {
    getNearbyList,
    list,
  };
};

export default {
  name: "Home",
  components: { StaticPart, ShopInfo, Nearby, Docker, newTitle },
  setup() {
    const { getNearbyList, list } = handler();
    getNearbyList();
    const store = useStore();
    store.dispatch("test", { user: 100 });
    return { list };
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
    top: 20px;
    bottom: 50px;
    right: 0;
    padding: 0 18px 10px 18px;
  }
}
@media screen and (min-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 20px;
    right: 0;
    box-sizing: border-box;
  }
  .clearfix::after{
    display: block;
    clear: both;
    content: '';
  }
  .docker_bottom{
    display: none;
  }
}
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
</style>
