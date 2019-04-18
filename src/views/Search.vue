<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="_onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
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
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @_listScroll="_blurInput" @select="_saveSearch"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from '_c/search-box/search-box'
import Suggest from '_c/suggest/suggest'
import SearchList from '_c/search-list/search-list'
import { getHotKey } from '@/api/search'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    SearchBox,
    Suggest,
    SearchList
  },
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    ...mapState(['searchHistory'])
  },
  methods: {
    ...mapActions(['saveSearchHistory']),
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
    _saveSearch () {
      this.saveSearchHistory(this.query)
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
