<template>
  <div class="container collect">
    <header>
      <nav-bar title="收藏" :left-text="'返回'" :left-arrow="true" />
    </header>
    <section class="list-section">
      <van-search placeholder="搜索" v-model="keyword" @search="onSearch" />
      <van-skeleton title avatar :row="3" :loading="loading">
        <div class="item" v-for="(item, index) in list" :key="index" @click="goDetailed(item._id)">
          <img class="avatar" :src="item.avatar[0].content" />
          <div class="content">
            <span class="nickname">{{ item.nickname }}</span>
            <span class="time">{{ item.time | moment('YYYY-MM-DD') }}</span>
            <p class="msg van-ellipsis">{{ item.content }}</p>
          </div>
        </div>
      </van-skeleton>
    </section>
  </div>
</template>

<script>
import { NavBar } from "@/components";
import { mapGetters } from "vuex";
import { getCollectByUid } from "@/api/collect";
import { Search, Skeleton } from "vant";

export default {
  name: "About",
  components: {
    NavBar,
    [Search.name]: Search,
    [Skeleton.name]: Skeleton
  },
  data() {
    return {
      list: {},
      keyword: "",
      loading: true
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getCollectByUid(this.user.id).then(res => {
        this.list = res.data;
      });
      this.loading = false;
    },
    goDetailed(id) {
      this.$router.push({ name: "detailed", params: { id: id } });
    },
    onSearch() {
      this.$router.push({
        name: "search",
        params: { type: "collect", keyword: this.keyword }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.collect {
  min-height: 100vh;
  box-sizing: border-box;
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
</style>