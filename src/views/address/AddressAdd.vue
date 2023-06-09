<template>
  <div class="wrapper">
    <div class="title">
      <div class="title__back iconfont" @click="handleBackClick">&#xe697;</div>
      <div class="title__content">
        <div class="title__content__info">Add the shipping address</div>
      </div>
    </div>
    <div class="address">
      <!-- <div class="address__item" @click="handleAreaShowClick">
        <div class="address__item__title">所在地区：</div>
        <input
          type="text"
          placeholder="点击选择地区"
          class="area"
          v-model="area"
        />
      </div> -->
      <div class="address__item">
        <div class="address__item__title">Full address：</div>
        <input
          type="text"
          placeholder="Please fill in the full address"
          v-model="detailedAddress"
        />
      </div>
      <div class="address__item">
        <div class="address__item__title">consignee：</div>
        <input
          type="text"
          placeholder="Please fill in the name of the consignee"
          v-model="consigneeName"
        />
      </div>
      <div class="address__item">
        <div class="address__item__title">Contact number：</div>
        <input type="text" placeholder="Please fill in the consignee's mobile phone number" v-model="tel" />
      </div>
      <div class="address__item">
        <div class="address__item__title">Default address：</div>
        <input type="checkbox" class="switch" v-model="isDefault" />
      </div>
    </div>
    <v-distpicker
      type="mobile"
      class="v-distpicker"
      @selected="onSelected"
      v-if="showArea"
    ></v-distpicker>
    <div class="save" @click.once="handleSaveClick">save</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import request from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
import VDistpicker from "v-distpicker"; //引入地区三级联动组件

const useAddressEffect = (showToast) => {
  const router = useRouter();

  //获取用户缓存信息
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleBackClick = () => {
    router.back();
  };

  // v-model表单数据双向绑定
  let data = reactive({
    area: "",
    detailedAddress: "",
    consigneeName: "",
    tel: "",
    isDefault: false,
  });

  const handleSaveClick = async () => {
    const result = await request.post("/user/address/add", {
      userId: userInfo.id,
      consigneeName: data.consigneeName,
      tel: data.tel,
      area: data.area,
      detailedAddress: data.detailedAddress,
      isDefault: data.isDefault === true ? "1" : "0",
    });
    if (result.message === "success" && result.code === 0) {
      router.back();
    } else {
      showToast(result.message);
    }
  };

  const { consigneeName, tel, area, detailedAddress, isDefault } = toRefs(data);

  return {
    consigneeName,
    tel,
    area,
    detailedAddress,
    isDefault,
    handleBackClick,
    handleSaveClick,
  };
};

// 展示隐藏地区选择器的逻辑
const toggleAreaEffect = () => {
  const showArea = ref(false);
  const handleAreaShowClick = () => {
    showArea.value = !showArea.value;
  };

  return { showArea, handleAreaShowClick };
};

export default {
  name: "AddressSave",
  components: { VDistpicker, Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { showArea, handleAreaShowClick } = toggleAreaEffect();
    const {
      consigneeName,
      tel,
      area,
      detailedAddress,
      isDefault,
      handleBackClick,
      handleSaveClick,
    } = useAddressEffect(showToast);
    return {
      consigneeName,
      tel,
      area,
      detailedAddress,
      isDefault,
      showArea,
      show,
      toastMessage,
      handleAreaShowClick,
      handleBackClick,
      handleSaveClick,
    };
  },
  methods: {
    //地区三级联动 选完最后一项后触发此方法
    onSelected(data) {
      //获取地区信息
      this.area = data.province.value + data.city.value + data.area.value;
      //选择完毕 调用方法隐藏地区三级联动
      this.handleAreaShowClick();
    },
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
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: rgb(248, 248, 248);
  }
  .title {
    display: flex;
    padding: 0 0.18rem;
    line-height: 0.44rem;
    height: 0.44rem;
    background-color: #ffffff;
    &__back {
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      color: #333333;
      &__info {
        flex: 1;
        text-align: center;
        font-size: 0.16rem;
      }
      &__more {
        font-size: 0.14rem;
      }
    }
  }
  .v-distpicker {
    overflow-y: scroll;
    text-align: center;
    font-size: 0.15rem;
    width: 100%;
    height: 4rem;
  }
  .address {
    padding: 0 0.18rem;
    background-color: #ffffff;
    margin-top: 0.12rem;
    &__item {
      padding: 0.18rem 0.12rem;
      height: 0.2rem;
      font-size: 0.14rem;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      &__title {
        color: #000000;
        line-height: 0.2rem;
        height: 0.2rem;
      }
      .area {
        pointer-events: none;
      }
      input {
        color: #999;
        border: 0 solid #3a91f3;
        outline: none;
        ::placeholder {
          color: #999 !important;
        }
      }
      .switch {
        width: 0.5rem;
      }
    }
  }
  .save {
    margin: 0.3rem 0.1rem;
    height: 0.5rem;
    background: #0091ff;
    color: white;
    font-size: 0.2rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.2rem;
  }
}
@media screen and (min-width: 600px) {
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50px;
    right: 0;
    background: rgb(248, 248, 248);
  }
  .title {
    display: flex;
    padding: 0 18px;
    line-height: 44px;
    height: 44px;
    background-color: #ffffff;
    &__back {
      width: 30px;
      font-size: 24px;
      color: #b6b6b6;
    }
    &__content {
      display: flex;
      flex: 1;
      color: #333333;
      &__info {
        flex: 1;
        text-align: center;
        font-size: 16px;
      }
      &__more {
        font-size: 14px;
      }
    }
  }
  .v-distpicker {
    overflow-y: scroll;
    text-align: center;
    font-size: 15px;
    width: 100%;
    height: 400px;
  }
  .address {
    padding: 0 18px;
    background-color: #ffffff;
    margin-top: 12px;
    &__item {
      padding: 18px 12px;
      height: 20px;
      font-size: 14px;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      &__title {
        color: #000000;
        line-height: 20px;
        height: 20px;
      }
      .area {
        pointer-events: none;
      }
      input {
        color: #999;
        border: 0 solid #3a91f3;
        outline: none;
        ::placeholder {
          color: #999 !important;
        }
      }
      .switch {
        width: 50px;
      }
    }
  }
  .save {
    margin: 30px 10px;
    height: 50px;
    background: #0091ff;
    color: white;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    border-radius: 20px;
  }
}

</style>
