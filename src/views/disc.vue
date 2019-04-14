<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songArr="songArr"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '_c/music-list/music-list'
import { mapState } from 'vuex'
import { getDiscDetail } from '@/api/recommend'
import { Song } from '@/lib/utils'

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
    ...mapState(['disc']),
    title () { return this.disc.name },
    bgImage () { return this.disc.coverImgUrl }
  },
  methods: {
    _getDiscDetail () {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      getDiscDetail(this.disc.id).then(res => {
        this.songArr = this._normalizeSongs(res.playlist.tracks)
        console.log(this.songArr)
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        if (item.name && item.id) {
          ret.push(new Song({
            id: item.id, name: item.name, time: item.dt, singer: item.ar[0].name, picUrl: item.al.picUrl
          }))
        }
      })
      return ret
    }
  },
  created () {
    this._getDiscDetail()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
