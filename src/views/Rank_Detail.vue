<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songArr="songArr" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import { getRankListDetail } from '@/api/rank'
import { Song } from '@/lib/utils'
import MusicList from '_c/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data () {
    return {
      songArr: [],
      rank: true
    }
  },
  computed: {
    ...mapState({
      title: state => state.topList.name,
      bgImage: state => state.topList.coverImgUrl,
      id: state => state.topList.id
    })
  },
  methods: {
    _getRankListDetail () {
      getRankListDetail(this.id).then(res => {
        if (res.code === 200) {
          this.songArr = this._normalizeSongs(res.playlist.tracks)
        }
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
    this._getRankListDetail()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
