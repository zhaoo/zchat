<template>
  <div class="container about">
    <header>
      <nav-bar title="关于" :left-text="'返回'" :left-arrow="true" />
    </header>
    <section class="logo-section">
      <img src="/logo.png" class="logo" />
      <span class="version">{{ version }}</span>
    </section>
    <section class="info-section">
      <van-cell title="更新" is-link url="https://github.com/izhaoo/zchat/releases" />
      <van-cell title="帮助" is-link url="https://github.com/izhaoo/zchat/README.md" />
      <van-cell title="反馈" is-link url="https://github.com/izhaoo/zchat/issues" />
    </section>
    <footer>
      <div class="link">
        <a href="https://github.com/izhaoo/zchat">GitHub</a>
        <span class="divide">|</span>
        <a href="https://www.izhaoo.com">作者主页</a>
      </div>
      <p class="copyright">Copyright © 2019-2019 zhaoo. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
import { Cell } from "vant";
import { NavBar } from "@/components";

export default {
  name: "About",
  components: {
    NavBar,
    [Cell.name]: Cell
	},
	data() {
		return {
			version: ''
		}
	},
	created() {
		this.version = 'v ' + process.env.VUE_APP_VERSION
	}
};
</script>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .logo-section {
    text-align: center;
    .logo {
      width: 50%;
      height: 50%;
      display: block;
      margin: 0 auto;
    }
  }
  .info-section {
    margin-top: 20px;
  }
  footer {
    text-align: center;
    bottom: 0px;
    position: fixed;
    width: 100%;
    .link {
      font-size: 13px;
      color: #1989fa;
      .divide {
        margin: 0 5px;
      }
      a:link,
      a:visited,
      a:active,
      a:hover {
        color: #1989fa;
      }
    }
    .copyright {
      font-size: 12px;
    }
  }
}
</style>
