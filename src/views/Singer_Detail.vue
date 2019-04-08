<template>
  <transition name="slider">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      singer: state => state.singer
    })
  },
  created () {
    console.log(this.singer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/variable'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
