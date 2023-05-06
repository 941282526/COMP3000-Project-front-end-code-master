<template>
  <div class="wrapper">
    <!--    <StaticPart />-->
    <Shop />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
// import StaticPart from "./StaticPart";
// import Nearby from "./Nearby";
import Docker from "@/components/Docker";
import { useStore } from "vuex";
import Shop from "@/views/shop/Shop";
export default {
  name: "Home",
  components: { Shop, Docker },
  setup() {
    const store = useStore();
    store.dispatch("test", { user: 100 });
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
</style>
