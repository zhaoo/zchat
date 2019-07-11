<template>
  <div class="container search">
    <header>
      <nav-bar title="搜索" :left-text="'返回'" :left-arrow="true" />
      <section class="search-section">
        <van-search placeholder="搜索" />
        <div v-if="type=='message'||type=='collect'">
          <div
            class="item"
            v-for="(item, index) in list"
            :key="index"
            @click="type=='collect'?goDetailed(item._id):goChat(user.id==item.from?item.to:item.from)"
          >
            <img class="avatar" :src="item.avatar[0].content" />
            <div class="content">
              <span class="nickname">{{ item.nickname }}</span>
              <span class="time">{{ item.time | moment('YYYY-MM-DD') }}</span>
              <p class="msg van-ellipsis">{{ item.content }}</p>
            </div>
          </div>
        </div>
        <div v-if="type=='friend'">
          <van-index-bar>
            <van-index-anchor>朋友</van-index-anchor>
            <van-cell
              v-for="item in list"
              :key="item.id"
              :title="item.nickname"
              :to="{ name: 'chat', params: {uid: item._id}}"
              :icon="item.avatar[0].content"
              clickable
              size="large"
            />
          </van-index-bar>
        </div>
      </section>
    </header>
  </div>
</template>

<script>
import { Search, Toast, IndexBar, IndexAnchor, Cell } from "vant";
import { NavBar } from "@/components";
import { searchFriend } from "@/api/user";
import { searchCollect } from "@/api/collect";
import { searchMessage } from "@/api/message";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    NavBar,
    [Search.name]: Search,
    [Toast.name]: Toast,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: {},
      type: "",
      keyword: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.type = this.$route.params.type;
    this.keyword = this.$route.params.keyword;
    if (this.type == "message") {
      searchMessage(this.keyword, this.user.id).then(res => {
        if (res.data.length !== 0) {
          this.list = res.data;
        } else {
          Toast.fail("未搜索到内容");
        }
      });
    } else if (this.type == "collect") {
      searchCollect(this.keyword, this.user.id).then(res => {
        if (res.data.length !== 0) {
          this.list = res.data;
        } else {
          Toast.fail("未搜索到内容");
        }
      });
    } else if (this.type == "friend") {
      searchFriend(this.keyword).then(res => {
        if (res.data.length !== 0) {
          this.list = res.data;
        } else {
          Toast.fail("未搜索到内容");
        }
      });
    }
  },
  methods: {
    goDetailed(id) {
      this.$router.push({ name: "detailed", params: { id: id } });
    },
    goChat(uid) {
      this.$router.push({ name: "chat", params: { uid: uid } });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  box-sizing: border-box;
  .search-section {
    .item {
      padding: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
        float: left;
      }
      .content {
        height: 40px;
        display: block;
        margin-left: 50px;
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
