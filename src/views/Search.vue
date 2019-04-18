<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="_onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="(item, index) in hotKey"
                :key="index"
                @click="_addQuery(item.first)"
              >
                <span>{{ item.first }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="_showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              :searches="searchHistory"
              @selected="_addQuery"
              @deleted="deleteSearchHistory"
            ></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="suggestWrapper" v-show="query">
      <suggest  ref="query" :query="query" @_listScroll="_blurInput" @select="saveSearchHistory(query)"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所以搜索历史" confirmBtnText="清空" @confirm="clearSeachHistory"></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from '_c/search-box/search-box'
import Suggest from '_c/suggest/suggest'
import SearchList from '_c/search-list/search-list'
import Confirm from '_c/confirm/confirm'
import Scroll from '_c/scroll/scroll'
import { getHotKey } from '@/api/search'
import { mapState, mapActions } from 'vuex'
import { playListMixin } from '@/lib/mixin'
export default {
  mixins: [playListMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    ...mapState(['searchHistory']),
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  methods: {
    handlePlayList (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut._refresh()
      this.$refs.suggestWrapper.style.bottom = bottom
      this.$refs.query._refresh()
    },
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSeachHistory']),
    _getHotKey () {
      getHotKey().then(res => {
        if (res.code === 200) {
          this.hotKey = res.result.hots
        }
      })
    },
    _addQuery (query) {
      this.$refs.searchBox._setQuery(query)
    },
    _onQueryChange (query) {
      this.query = query
    },
    _blurInput () {
      this.$refs.searchBox._blur()
    },
    _showConfirm () {
      this.$refs.confirm._show()
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        this.$nextTick(() => {
          this.$refs.shortcut._refresh()
        })
      }
    }
  },
  created () {
    this._getHotKey()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/variable';
@import '../assets/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
