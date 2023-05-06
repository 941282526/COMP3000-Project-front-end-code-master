<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe697;
      </div>
      Choose a time and table
    </div>
  </div>
  <div style="margin-left: 0.12rem; margin-top: 0">
    <el-radio-group v-model="date0" @change="getDate" size="large">
      <el-radio-button
        class="el_radio"
        v-for="item in dateList"
        :label="item"
        :key="item"
        >{{ item }}</el-radio-button
      >
    </el-radio-group>
  </div>
  <el-divider />
  <div style="margin-left: 0.12rem; margin-top: 10px">
    <el-radio-group v-model="time0" @Change="getTime" size="large">
      <el-radio-button
        class="el_radio"
        v-for="item in timeList"
        :label="item"
        :key="item"
        >{{ item }}</el-radio-button
      >
    </el-radio-group>
  </div>
  <el-divider />
  <div style="margin-left: 0.12rem; margin-top: 10px;">
    <el-radio-group v-model="seat0Key" @Change="getSeat" size="large">
      <el-radio-button
        class="el_radio"
        v-for="item in seatList"
        :label="item.key"
        :key="item.key"
        :disabled="!item.status"
        >{{ item.desc }}</el-radio-button
      >
    </el-radio-group>
  </div>
  <el-divider style="margin-bottom: 100px;" />
  <div class="check" style="width: 100%">
    <div class="check__icon">
      <img
        src="https://images.gaoshiyi.top/static/basket.png"
        class="check__icon__img"
        alt="fail"
      />
    </div>
    <div class="check__info">{{ date0 }}day {{ time0 }}time, {{ seat0Desc }}</div>
    <div class="check__btn">
      <router-link @click="submitDinner" to> Ok, so submit </router-link>
    </div>
  </div>
</template>

<script>
import { ElRadioGroup, ElRadioButton, ElDivider } from "element-plus";
import { ref } from "vue";
import request from "@/utils/request";
import { useRoute, useRouter } from "vue-router";

const dateList = ref([]);
const timeList = ref([]);
const seatList = ref([]);
let date0 = ref("");
let time0 = ref("");
let seat0Desc = ref("");
let seat0Key = ref("");
let seatMap = ref({});

export const handler = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  const submitDinner = async () => {
    const array1 = date0.value.split(".");
    const result = await request.post("/dinner/dinnerSave", {
      seatId: seat0Key.value,
      quantity: 1,
      dinnerTime:
        new Date().getFullYear() +
        "-" +
        array1[0] +
        "-" +
        array1[1] +
        " " +
        time0.value,
    });
    if (result.message === "success") {
      const number = result.data;
      if (number <= 0) {
        await router.push({ path: "/shop/1" });
      } else {
        await router.push({ name: "Wait/" + number });
      }
    }
  };
  const getDateTimeList = async () => {
    const route = useRoute();
    const result = await request.get("/home/getDateTimeList", {
      pre: `${route.params.pre}`,
    });
    if (result.message === "success") {
      dateList.value = result.data.dateList;
      timeList.value = result.data.timeList;
      date0.value = result.data.dateList[0];
      time0.value = result.data.timeList[0];
      await getSeatList();
    }
    return { dateList, timeList, seatList, date0, time0 };
  };
  const getSeatList = async () => {
    const array1 = date0.value.split(".");
    const result = await request.get("/home/dinnerSeatList", {
      dinnerTime:
        new Date().getFullYear() +
        "-" +
        array1[0] +
        "-" +
        array1[1] +
        " " +
        time0.value,
    });
    if (result.message === "success") {
      seatList.value = result.data;
      for (const seat of result.data) {
        if (seat0Key.value === "" && seat.status) {
          seat0Desc.value = seat.desc;
          seat0Key.value = seat.key;
          console.log(seat.key);
        }
        seatMap.value[seat.key] = seat.desc;
      }
    }else if( result.code === 40008 ){
      await router.push({ name: "Login" });
    }
    return { seatList };
  };
  return {
    handleBackClick,
    getDateTimeList,
    getSeatList,
    submitDinner,
    dateList,
    timeList,
    seatList,
    date0,
    time0,
    seat0Desc,
    seat0Key,
  };
};

export default {
  name: "PreDinner",
  components: { ElRadioGroup, ElRadioButton, ElDivider },
  setup() {
    const {
      handleBackClick,
      getDateTimeList,
      getSeatList,
      submitDinner,
      dateList,
      timeList,
      seatList,
      date0,
      time0,
      seat0Desc,
      seat0Key,
    } = handler();
    getDateTimeList();
    return {
      handleBackClick,
      getSeatList,
      submitDinner,
      dateList,
      timeList,
      seatList,
      date0,
      time0,
      seat0Desc,
      seat0Key,
    };
  },
  data() {
    return {
      tabs: [],
    };
  },
  created() {
    // this.getDate();
  },
  methods: {
    getDate(val) {
      console.log(val);
      date0.value = val;
      this.getSeatList();
    },
    getTime(val) {
      console.log(val);
      time0.value = val;
      this.getSeatList();
    },
    getSeat(val) {
      console.log(val);
      seat0Key.value = val;
      seat0Desc.value = seatMap.value[val];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
@media screen and(max-width: 600px) {
  .el_radio {
    border-left: 1px solid #dcd8d8;
  }
  .check {
    border-top: 0.01rem solid #dcd8d8;
    position: fixed;
    bottom: 0;
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    &__icon {
      position: relative;
      width: 0.84rem;
      &__img {
        display: block;
        margin: 0.12rem auto;
        width: 0.28rem;
        height: 0.26rem;
      }
      &__tag {
        position: absolute;
        left: 0.46rem;
        top: 0.04rem;
        padding: 0 0.04rem;
        min-width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        background-color: $hightlight-fontColor;
        border-radius: 0.1rem;
        font-size: 0.12rem;
        text-align: center;
        color: #fff;
        transform: scale(0.5);
        transform-origin: left center;
      }
    }
    &__info {
      flex: 1;
      color: $content-fontcolor;
      font-size: 0.12rem;
      &__price {
        line-height: 0.49rem;
        color: $hightlight-fontColor;
        font-size: 0.18rem;
      }
    }
    &__btn {
      width: 0.98rem;
      background-color: #4fb0f9;
      text-align: center;
      font-size: 0.14rem;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .check__btn {
    position: fixed;
    right: 0;
  }
  .check__info {
    font-size: 14px;
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
  .el_radio {
    border-left: 1px solid #dcd8d8;
  }
  .check {
    border-top: 1px solid #dcd8d8;
    position: fixed;
    bottom: 0;
    display: flex;
    height: 49px;
    line-height: 49px;
    &__icon {
      position: relative;
      width: 84px;
      &__img {
        display: block;
        margin: 12px auto;
        width: 28px;
        height: 26px;
      }
      &__tag {
        position: absolute;
        left: 46px;
        top: 4px;
        padding: 0 4px;
        min-width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: $hightlight-fontColor;
        border-radius: 10px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        transform: scale(0.5);
        transform-origin: left center;
      }
    }
    &__info {
      flex: 1;
      color: $content-fontcolor;
      font-size: 12px;
      &__price {
        line-height: 49px;
        color: $hightlight-fontColor;
        font-size: 18px;
      }
    }
    &__btn {
      width: 98px;
      background-color: #4fb0f9;
      text-align: center;
      font-size: 14px;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .check__btn {
    position: fixed;
    right: 0;
  }
  .check__info {
    font-size: 14px;
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
