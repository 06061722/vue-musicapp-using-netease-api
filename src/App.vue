<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from '_c/m-header/m-header'
import Tab from '_c/tab/tab'
import Player from '_c/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>
<style lang="stylus">
</style>
