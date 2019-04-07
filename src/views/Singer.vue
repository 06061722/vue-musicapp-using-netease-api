<template>
  <div class="singer" ref="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>
<script>
import { getSingerList } from '@/api/singer'
import { Singer } from '@/lib/utils'
import ListView from '_c/listview/listview'
const pinyin = require('pinyin')

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  components: {
    ListView
  },
  data () {
    return {
      singers: []
    }
  },
  methods: {
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
          arr['HOT'].items.push(new Singer(item.id, item.name, item.picUrl))
        }
        const key = pinyin(item.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })[0][0].toUpperCase()
        if (!arr[key]) arr[key] = { title: key, items: [] }
        arr[key].items.push(new Singer(item.id, item.name, item.picUrl))
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
