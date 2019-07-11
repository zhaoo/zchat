<template>
  <div class="container chat">
    <header>
      <nav-bar :title="friend.nickname" :left-text="'返回'" :left-arrow="true" />
    </header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <section class="chat-section">
        <div
          v-for="(item, index) in msgList"
          :key="index"
          :class="['item', item.type=='send'?'right':'left']"
        >
          <img
            class="avatar"
            :src="item.type=='send'?user.avatar[0].content:friend.avatar[0].content"
          />
          <div
            class="message"
            @touchstart="touchstart(item)"
            @touchend="touchend"
          >{{ item.content }}</div>
        </div>
      </section>
    </van-pull-refresh>
    <footer>
      <van-cell-group>
        <van-field center clearable v-model="msg.content" @keyup.enter="submitMsg">
          <van-button slot="button" size="small" type="default" @click="submitMsg">发送</van-button>
        </van-field>
      </van-cell-group>
    </footer>
    <van-action-sheet
      v-model="showSheet"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
import { NavBar } from "@/components";
import { getUser } from "@/api/user";
import { createCollect } from "@/api/collect";
import { getMsgByFid, updateRead, deleteMsg } from "@/api/message";
import { mapGetters } from "vuex";
import {
  Field,
  Button,
  CellGroup,
  PullRefresh,
  Toast,
  ActionSheet,
  Dialog
} from "vant";
import socketio from "socket.io-client";
const io = socketio(process.env.VUE_APP_BASE_URL);
export default {
  name: "Chat",
  components: {
    NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [ActionSheet.name]: ActionSheet,
    [Dialog.name]: Dialog
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    msgList: "scrollBottom"
  },
  data() {
    return {
      friend: {
        nickname: "聊天"
      },
      msg: {
        from: "",
        to: "",
        content: ""
      },
      msgList: [],
      isLoading: false,
      showSheet: false,
      actions: [{ name: "删除", className: "danger" }, { name: "收藏" }],
      selectMsg: ""
    };
  },
  created() {
    this.getFriend();
    this.receiveMsg();
  },
  methods: {
    onSelect(item) {
      if (item.name == "删除") {
        Dialog.confirm({
          message: "确定删除此条消息？"
        })
          .then(() => {
            deleteMsg(this.selectMsg._id).then((res) => {
              Toast.success(res.message)
            })
          })
          .catch(() => {});
      } else if (item.name == "收藏") {
        this.selectMsg.uid = this.user.id
        createCollect(this.selectMsg).then((res) => {
          Toast.success(res.message)
        })
      }
    },
    touchstart(msg) {
      clearInterval(this.Loop);
      this.Loop = setTimeout(() => {
        this.showSheet = true;
        this.selectMsg = msg;
      }, 500);
    },
    touchend() {
      clearInterval(this.Loop);
    },
    scrollBottom() {
      this.$nextTick(() => {
        const ele = document.querySelector(".chat-section");
        ele.scrollTop = ele.scrollHeight;
      });
    },
    getFriend() {
      getUser(this.$route.params.uid).then(res => {
        if (res.data) {
          this.friend = res.data;
        }
      });
    },
    submitMsg() {
      if (!this.friend._id) {
        Toast.fail("请选择好友");
      } else {
        this.msg.from = this.user.id;
        this.msg.to = this.friend._id;
        io.emit("sendmsg", this.msg);
        this.msg.content = "";
      }
    },
    receiveMsg() {
      io.on("getmsg", msg => {
        if (msg.from == this.user.id && msg.to == this.friend._id) {
          msg.type = "send";
          this.msgList.push(msg);
        } else if (msg.to == this.user.id && msg.from == this.friend._id) {
          msg.type = "get";
          this.msgList.push(msg);
          updateRead(msg._id);
        }
      });
    },
    onRefresh() {
      if (!this.friend._id) {
        Toast.fail("请选择好友");
      } else {
        this.msgList = [];
        setTimeout(async () => {
          await getMsgByFid(this.friend._id).then(res => {
            for (let msg of res.data) {
              if (msg.from == this.user.id && msg.to == this.friend._id) {
                msg.type = "send";
                this.msgList.push(msg);
              } else if (
                msg.to == this.user.id &&
                msg.from == this.friend._id
              ) {
                msg.type = "get";
                this.msgList.push(msg);
                updateRead(msg._id);
              }
            }
          });
          this.isLoading = false;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.van-button:active::before {
  opacity: 0;
}
.danger {
  color: #f44;
}
.chat {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .chat-section {
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