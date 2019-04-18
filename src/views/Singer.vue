<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @selectedItem="_selectedSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from '@/api/singerandsong'
import { Singer } from '@/lib/utils'
import { mapMutations } from 'vuex'
import { playListMixin } from '@/lib/mixin'
import ListView from '_c/listview/listview'
const pinyin = require('pinyin')

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins: [playListMixin],
  components: {
    ListView
  },
  data () {
    return {
      singers: []
    }
  },
  methods: {
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list._refresh()
    },
    ...mapMutations(['SET_SINGER']),
    _getSingerList () {
      getSingerList().then(res => {
        if (!res.code === 200) return
        this.singers = this._normalizeSingerList(res.artists)
      })
    },
    _normalizeSingerList (artists) {
      let arr = {}
      arr['HOT'] = { title: HOT_NAME, items: [] }
      artists.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          arr['HOT'].items.push(new Singer({ id: item.id, name: item.name, picUrl: item.picUrl }))
        }
        const key = pinyin(item.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })[0][0].toUpperCase()
        if (!arr[key]) arr[key] = { title: key, items: [] }
        arr[key].items.push(new Singer({ id: item.id, name: item.name, picUrl: item.picUrl }))
      })
      let hot = []
      let abc = []
      for (let key in arr) {
        if (arr[key].title === HOT_NAME) hot.push(arr[key])
        if (arr[key].title.match(/[A-Z]/)) abc.push(arr[key])
      }
      abc.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(abc)
    },
    _selectedSinger (singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.SET_SINGER(singer)
    }
  },
  created () {
    this._getSingerList()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
