<template>
  <div class="container weather">
    <header>
      <nav-bar title="天气查询" :left-text="'返回'" :left-arrow="true" />
    </header>
    <section class="weather-section">
      <div
        v-for="(item, index) in msgList"
        :key="index"
        :class="['item', item.type=='send'?'right':'left']"
      >
        <img
          class="avatar"
          :src="item.type=='send'?user.avatar[0].content:require('@/static/avatar/weather.jpg')"
        />
        <div class="message" v-html="item.content"></div>
      </div>
    </section>
    <footer>
      <van-cell-group>
        <van-field center clearable v-model="msg" @keyup.enter="submitMsg">
          <van-button slot="button" size="small" type="default" @click="submitMsg">发送</van-button>
        </van-field>
      </van-cell-group>
    </footer>
  </div>
</template>

<script>
import { NavBar } from "@/components";
import { mapGetters } from "vuex";
import { Field, Button, CellGroup, Toast } from "vant";
import { weather } from "@/api/tools";
export default {
  name: "Weather",
  components: {
    NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    msgList: "scrollBottom"
  },
  data() {
    return {
      msg: "",
      msgList: []
    };
  },
  created() {
    this.msgList.push({
      type: "get",
      content: "请输入查询城市名称<br>例如：杭州"
    });
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        const ele = document.querySelector(".weather-section");
        ele.scrollTop = ele.scrollHeight;
      });
    },
    submitMsg() {
      this.msgList.push({ type: "send", content: this.msg });
      weather({ city: this.msg }).then(res => {
        let w = res.data.realtime;
        this.msgList.push({
          type: "get",
          content:
            "天气: " +
            w.info +
            "<br>" +
            "温度: " +
            w.temperature +
            "°C" +
            "<br>" +
            "湿度: " +
            w.humidity +
            "%" +
            "<br>" +
            "风向: " +
            w.direct +
            "<br>" +
            "风速: " +
            w.power +
            "<br>" +
            "空气指数: " +
            w.aqi
        });
      });
      this.msg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.van-button:active::before {
  opacity: 0;
}
.weather {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .weather-section {
    padding: 10px;
    overflow: scroll;
    height: calc(100vh - 100px);
    .item {
      margin-bottom: 20px;
      .avatar {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
      }
      .message {
        color: #ffffff;
        display: block;
        padding: 6px 10px;
        background-color: #4d90fe;
        margin: 0 50px;
      }
    }
    .left {
      .avatar {
        float: left;
      }
      .message {
        color: #333333;
        background-color: #ffffff;
      }
    }
    .right {
      .avatar {
        float: right;
      }
    }
  }
  footer {
    bottom: 0;
    position: absolute;
    width: 100%;
    .van-cell {
      padding-right: 0;
      .van-button {
        border: none;
        color: #1989fa;
        font-size: 14px;
      }
      .van-button::before {
        opacity: none;
      }
    }
  }
}
</style>