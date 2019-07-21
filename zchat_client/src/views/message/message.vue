<template>
  <div class="container message">
    <header>
      <nav-bar title="消息" />
    </header>
    <section class="message-section">
      <van-search placeholder="搜索" v-model="keyword" @search="onSearch" />
      <van-skeleton title avatar :row="3" :loading="loading">
        <div class="item" @click="goChat(item.fid)" v-for="(item, index) in list" :key="index">
          <img class="avatar" :src="item.avatar[0].content" />
          <van-tag class="number" round type="danger" v-if="item.sum">{{ item.sum }}</van-tag>
          <div class="content">
            <span class="nickname">{{ item.nickname }}</span>
            <span class="time">{{ item.time | moment('YYYY-MM-DD') }}</span>
            <p class="msg van-ellipsis">{{ item.content }}</p>
          </div>
        </div>
      </van-skeleton>
    </section>
    <footer>
      <tabbar />
    </footer>
  </div>
</template>

<script>
import { Search, SwipeCell, Dialog, Tag, Skeleton } from "vant";
import { Tabbar, NavBar } from "@/components";
import { getMsg } from "@/api/message";
import { mapGetters } from "vuex";

export default {
  name: "Message",
  components: {
    Tabbar,
    NavBar,
    [Search.name]: Search,
    [SwipeCell.name]: SwipeCell,
    [Dialog.name]: Dialog,
    [Tag.name]: Tag,
    [Skeleton.name]: Skeleton
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      loading: true,
      list: {},
      keyword: ""
    };
  },
  created() {
    getMsg(this.user.id).then(res => {
      this.list = res.data;
      this.loading = false;
    });
  },
  methods: {
    goChat(uid) {
      this.$router.push({ name: "chat", params: { uid: uid } });
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
    onSearch() {
      this.$router.push({
        name: "search",
        params: { type: "message", keyword: this.keyword }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  min-height: 100vh;
  box-sizing: border-box;
  .message-section {
    overflow: scroll;
    height: calc(100vh - 96px);
    .item {
      padding: 10px;
      .avatar {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
        float: left;
      }
      .number {
        position: fixed;
        left: 50px;
      }
      .content {
        height: 50px;
        display: block;
        margin-left: 60px;
        .time {
          font-size: 12px;
          float: right;
          color: #888888;
        }
        .msg {
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
}
</style>