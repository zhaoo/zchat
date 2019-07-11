<template>
  <div class="container detailed">
    <header>
      <nav-bar title="详情" :left-text="'我的收藏'" :left-arrow="true" />
    </header>
    <section class="detailed-section">
      <div class="user">
        <img class="avatar" :src="collect.avatar[0].content" />
        <div class="content">
          <span class="nickname">{{ collect.nickname }}</span>
          <span class="time">{{ collect.time | moment('YYYY-MM-DD') }}</span>
        </div>
        <hr>
				<p>{{ collect.content }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { NavBar } from "@/components";
import { getCollectById } from "@/api/collect";

export default {
  name: "Detailed",
  components: {
    NavBar
  },
  data() {
    return {
      collect: {
        avatar: [{ content: "" }],
        nickname: ""
      }
    };
  },
  created() {
    this.getCollect();
  },
  methods: {
    getCollect() {
      getCollectById(this.$route.params.id).then(res => {
        if (res) {
          this.collect = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detailed {
  min-height: 100vh;
  box-sizing: border-box;
  .detailed-section {
    .user {
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
				line-height: 40px;
        display: block;
        margin-left: 50px;
        .time {
          font-size: 12px;
          float: right;
          color: #888888;
        }
      }
    }
  }
}
</style>