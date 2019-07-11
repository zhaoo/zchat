<template>
  <div class="container express">
    <header>
      <nav-bar title="快递查询" :left-text="'返回'" :left-arrow="true" />
    </header>
    <section class="express-section">
      <div
        v-for="(item, index) in msgList"
        :key="index"
        :class="['item', item.type=='send'?'right':'left']"
      >
        <img
          class="avatar"
          :src="item.type=='send'?user.avatar[0].content:'/avatar/express.jpg'"
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
import { express, expressType } from "@/api/tools";
export default {
  name: "Express",
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
      content:
        '请输入快递类型和单号<br>例如：顺丰 894519210<br>回复"快递类型"查询所有快递'
    });
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        const ele = document.querySelector(".express-section");
        ele.scrollTop = ele.scrollHeight;
      });
    },
    submitMsg() {
      this.msgList.push({ type: "send", content: this.msg });
      if (this.msg == "快递类型") {
        expressType().then(res => {
          let str = "";
          for (let item in res.data) {
            str = str + item + " ";
          }
          this.msgList.push({
            type: "get",
            content: "支持以下快递: <br>" + str
          });
        });
      } else {
        const req = this.msg.trim().split(/\s+/);
        express({ type: req[0], code: req[1] }).then(res => {
          if (res.data.length !== 0) {
            for (let item of res.data) {
              this.msgList.push({
                type: "get",
                content:
                  "时间: " + item.AcceptTime + "<br>内容: " + item.AcceptStation
              });
            }
          } else {
            this.msgList.push({ type: "get", content: res.message });
          }
        });
      }
      this.msg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.van-button:active::before {
  opacity: 0;
}
.express {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .express-section {
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