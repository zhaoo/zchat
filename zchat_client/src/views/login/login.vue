<template>
  <div class="container login">
    <section class="title-section">
      <h1>zchat</h1>
    </section>
    <section class="input-section">
      <van-cell-group
        :model="loginForm"
      >
        <van-field
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          left-icon="manager"
          type="text"
        />
        <van-field
          ref="password"
          v-model="loginForm.password"
          placeholder="密码"
          left-icon="lock"
          type="password"
          @keyup.enter="login"
        />
      </van-cell-group>
    </section>
    <section class="btn-section">
      <van-button
        :loading="loading"
        type="info"
        loading-text="登录中..."
        @click="login"
      >
        登录
      </van-button>
    </section>
    <section class="router-section">
      <router-link to="message">
        回到首页
      </router-link>
      <span>|</span>
      <router-link to="register">
        注册帐号
      </router-link>
    </section>
  </div>
</template>

<script>
import { Field, Row, Col, CellGroup, Button } from 'vant'
export default {
	name: 'Login',
	components: {
		[Field.name]: Field,
		[Row.name]: Row,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
	},
	data() {
		return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
		}
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push("message");
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 40% 30px 0 30px;
  background-color: #f5f5f5;
  .title-section {
    text-align: center;
    h1 {
      margin: 0;
    }
  }
  .input-section {
    margin: 20px 0;
  }
  .btn-section {
    .van-button {
      border-radius: 0px;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .router-section {
    text-align: center;
    margin-top: 150px;
    span {
      margin: 0 5px;
    }
    a, span {
      color: #1989fa;
    }
    a:hover {
      color: #167ce2;
    }
  }
}
</style>
