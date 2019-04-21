<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="_hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box placeholder="搜索歌曲" @query="_onQueryChange" ref="searchBox"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" @switched="_switched" :currentIndex="currentIndex"></switches>
        <div class="list-wrapper">
          <scroll
            class="list-scroll"
            ref="songList"
            v-show="currentIndex === 0"
            :data="playHistory"
          >
            <div class="list-inner">
              <song-list :songArr="playHistory" @selectedSong="_selectedSong"></song-list>
            </div>
          </scroll>
          <scroll
            class="list-scroll"
            ref="searchList"
            v-show="currentIndex === 1"
            :data="searchHistory"
          >
            <div class="list-inner">
              <search-list
                @deleted="deleteSearchHistory"
                @selected="_addQuery"
                :searches="searchHistory"
              ></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest
          :query="query"
          :showSinger="showSinger"
          @select="saveSearchHistory(query)"
          @listScroll="_blurInput"
        ></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import SearchBox from '_c/search-box/search-box'
import Suggest from '_c/suggest/suggest'
import Switches from '_c/switches/switches'
import Scroll from '_c/scroll/scroll'
import SongList from '_c/song-list/song-list'
import SearchList from '_c/search-list/search-list'
import TopTip from '_c/top-tip/top-tip'
import { mapState, mapActions } from 'vuex'
import { searchMixin } from '@/lib/mixin'
import { Song } from '@/lib/utils'
export default {
  mixins: [searchMixin],
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
    SearchList,
    TopTip
  },
  data () {
    return {
      showFlag: false,
      showSinger: true,
      currentIndex: 0,
      switches: [
        { name: '最近播放' },
        { name: '搜索历史' }
      ]
    }
  },
  computed: {
    ...mapState(['playHistory', 'searchHistory'])
  },
  methods: {
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSeachHistory', 'insertSong']),
    _show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (this.currentIndex === 0) this.$refs.songList._refresh()
        else this.$refs.searchList._refresh()
      })
    },
    _hide () {
      this.showFlag = false
    },
    _switched (index) {
      this.currentIndex = index
      this.$nextTick(() => {
        if (index === 0) this.$refs.songList._refresh()
        else this.$refs.searchList._refresh()
      })
    },
    _selectedSong (song, index) {
      if (index !== 0) {
        this.insertSong(new Song({ id: song.id, name: song.name, time: song.time, singer: song.singer, picUrl: song.picUrl }))
        this._showTip()
      }
    },
    _showTip () {
      this.$refs.topTip._show()
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';
@import '../../assets/stylus/mixin';

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    height: 44px;
    text-align: center;

    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;

      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }

  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;

      .list-scroll {
        height: 100%;
        overflow: hidden;

        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }

  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }

  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>
