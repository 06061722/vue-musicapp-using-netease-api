<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage" :songArr="songArr"></music-list>
  </transition>
</template>

<script>
// 完全作为数据处理层（不包含任何UI）而存在，为了给引用的通用组件传递合适的数据。
import { mapState } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { createSongArr } from '@/lib/utils'
import MusicList from '_c/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data () {
    return {
      songArr: []
    }
  },
  computed: {
    ...mapState({
      singer: state => state.singer
    }),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.picUrl
    }
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code !== 200) return
        this.songArr = createSongArr(res.hotSongs)
        console.log(this.songArr)
      })
    }
  },
  created () {
    this._getSingerDetail()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
