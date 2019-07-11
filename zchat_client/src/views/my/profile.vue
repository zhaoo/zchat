<template>
  <div class="container profile">
    <header>
      <van-nav-bar
        title="修改信息"
        left-text="返回"
        right-text="提交"
        left-arrow
        @click-left="goBack"
        @click-right="onSubmit"
      />
    </header>
    <section class="base-section">
      <van-cell-group title="基本信息">
        <van-field v-model="user.username" label="用户名" clearable />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="user.nickname" label="昵称" clearable />
      </van-cell-group>
    </section>
    <section class="avatar-section">
      <div class="van-cell-group__title">上传头像</div>
      <van-uploader
        v-model="user.avatar"
        :max-count="1"
        :max-size="2*1024*1024"
        accept="image/*"
        :before-read="beforeRead"
      />
    </section>
    <section class="pwd-section">
      <van-cell-group title="修改密码">
        <van-field v-model="user.oldPwd" label="旧密码" clearable type="password" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="user.newPwd" label="新密码" clearable type="password" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="user.verifyPwd" label="密码验证" clearable type="password" />
      </van-cell-group>
    </section>
    <section class="logout-section">
      <van-cell-group title="删除帐户">
        <van-cell title="删除" icon="warn-o" clickable center @click="logout" />
      </van-cell-group>
    </section>
  </div>
</template>

<script>
import { Field, CellGroup, Uploader, NavBar, Notify, Cell, Dialog } from "vant";
import { mapGetters } from "vuex";
import { profile, deleteUser } from "@/api/user";
export default {
  name: "Profile",
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [NavBar.name]: NavBar,
    [Notify.name]: Notify,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Notify({
          message: "请上传图片格式文件",
          background: "#ff4444",
          duration: 1000
        });
        return false;
      }
      return true;
    },
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      profile(this.user).then(res => {
        if (res.code == 20000) {
          Notify({
            message: res.message,
            background: "#07c160",
            duration: 1000
          });
        }
      });
    },
    logout() {
      Dialog.confirm({
        message: "删除帐户后将无法恢复，是否删除？"
      })
        .then(() => {
          deleteUser(this.user.id)
          this.$router.push("login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.van-cell-group__title {
  padding: 15px;
}
.van-uploader {
  margin-left: 15px;
}
.profile {
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
