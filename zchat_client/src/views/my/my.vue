<template>
  <div class="container my">
    <header>
      <nav-bar title="我的" />
    </header>
    <section class="info-section">
      <img class="avatar" :src="user.avatar[0].content" @click="goProfile" />
      <div class="info">
        <h3 class="nickname" @click="goProfile">{{ user.nickname }}</h3>
        <span class="username" @click="goProfile">用户名: {{ user.username }}</span>
        <van-icon name="qr" class="qr" @click="showQr = true" />
      </div>
      <van-popup v-model="showQr">
        <qrcode :value="user.id" :options="{ size: 150 }" />
      </van-popup>
    </section>
    <section class="button-section">
      <van-cell title="收藏" icon="orders-o" to="collect" clickable center />
      <van-cell title="关于" icon="location-o" to="about" clickable center />
      <van-cell title="退出" icon="cross" @click="logout" clickable center />
    </section>
    <footer>
      <tabbar />
    </footer>
  </div>
</template>

<script>
import { Tabbar, NavBar } from "@/components";
import { Notify, Cell, CellGroup, Dialog, Icon, Popup } from "vant";
import { mapGetters } from "vuex";
import QRcode from "@xkeshi/vue-qrcode";

export default {
  name: "My",
  components: {
    Tabbar,
    NavBar,
    [Notify.name]: Notify,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    qrcode: QRcode
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      showQr: false
    };
  },
  methods: {
    logout() {
      Dialog.confirm({
        message: "确定退出？"
      })
        .then(async () => {
          await this.$store.dispatch("user/logout");
          this.$router.push("login");
        })
        .catch(() => {});
    },
    goProfile() {
      this.$router.push("profile");
    }
  }
};
</script>

<style lang="scss" scoped>
.my {
  .info-section {
    padding: 30px 15px;
    height: 80px;
    img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: block;
      float: left;
    }
    .info {
      margin-left: 100px;
      .nickname {
        margin: 0;
      }
      .username {
        font-size: 14px;
      }
      .qr {
        float: right;
        font-size: 20px;
      }
    }
  }
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
