<template>
  <scroll
    ref="scroll"
    class="suggest"
    :data="result"
    :pullUp="pullUp"
    @scrollToEnd="_searchMore"
    :beforeScroll="beforeScroll"
    @beforeScroll="_listScroll"
  >
    <ul class="suggest-list">
      <li
        @click="_selectedItem(item)"
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="_getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text">{{_getDisplayName(item)}}</p>
        </div>
      </li>
      <loading v-show="hasMore" title></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import { searchHotKey } from '@/api/search'
import { Singer, createSearchSong } from '@/lib/utils'
import { mapActions, mapMutations } from 'vuex'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
import NoResult from '_c/no-result/no-result'
const LIMIT = 30
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  },
  data () {
    return {
      page: 1,
      result: [],
      pullUp: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    ...mapActions(['insertSong']),
    ...mapMutations(['SET_SINGER']),
    _search () {
      this.hasMore = true
      this.page = 1
      if (this.showSinger) { // 两个异步的请求
        searchHotKey({ query: this.query, page: this.page, limit: LIMIT }).then(res => {
          if (res && res.code === 200 && res.result.songs) {
            const singer = res.result.songs[0].artists
            this.result = singer.concat(createSearchSong(res.result.songs))
          }
          this._checkMore({ page: this.page, limit: LIMIT, songCount: res === undefined ? 0 : res.result.songCount })
          if (res && res.result.songCount === 0) this.result = []
        })
      }
    },
    _getIconCls (item) {
      if (item) {
        if (!item.singer) return 'icon-mine'
        else return 'icon-music'
      }
    },
    _getDisplayName (item) {
      if (item) {
        if (!item.singer) return item.name
        else return `${item.name}--${item.singer}`
      }
    },
    _searchMore () {
      if (this.hasMore) {
        this.page++
        searchHotKey({ query: this.query, page: this.page, limit: LIMIT }).then(res => {
          if (res && res.code === 200) {
            this.result = this.result.concat(res.result.songs)
            this._checkMore({ page: this.page, limit: LIMIT, songCount: res.result.songCount })
          }
        })
      }
    },
    _checkMore ({ page, limit, songCount }) {
      const offset = (page - 1) * limit
      if (!songCount || offset >= songCount) this.hasMore = false
    },
    _selectedItem (item) {
      if (!item.singer) {
        const singer = new Singer({ id: item.id, name: item.name, picUrl: item.img1v1Url })
        this.SET_SINGER(singer)
        this.$router.push({ path: `/search/${singer.id}` })
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    _listScroll () {
      this.$emit('_listScroll')
    },
    _refresh () {
      this.$refs.scroll._refresh()
    }
  },
  watch: {
    query () {
      this._search()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';
@import '../../assets/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
