<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: ["message"],
};

export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: "",
  });

  const showToast = (message) => {
    toastData.show = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.show = false;
      toastData.toastMessage = "";
    }, 2000);
  };

  const { show, toastMessage } = toRefs(toastData);
  return { show, toastMessage, showToast };
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .toast {
    position: fixed;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    padding: 0.1rem;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 0.05rem;
    color: #fff;
  }
}
@media screen and (min-width: 600px) {
  .toast {
    position: fixed;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    color: #fff;
  }
}

</style>
