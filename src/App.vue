<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import MHeader from '_c/m-header/m-header'
import Tab from '_c/tab/tab.vue'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
<style lang="stylus">
</style>
