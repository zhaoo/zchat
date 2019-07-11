<template>
  <div class="container wait">
    <header>
      <nav-bar title="敬请期待" :left-text="'返回'" :left-arrow="true" />
    </header>
    <section class="wait-section">
      <h1>敬请期待</h1>
    </section>
  </div>
</template>

<script>
import { NavBar } from "@/components";

export default {
  name: "Wait",
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
.wait {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .wait-section {
      text-align: center;
  }
}
</style>
