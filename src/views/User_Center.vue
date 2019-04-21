<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="_back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="currentIndex" @switched="_switched"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="_random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll
          class="list-scroll"
          ref="favoriteList"
          v-show="currentIndex === 0"
          :data="favoriteList"
        >
          <div class="list-inner">
            <song-list :songArr="favoriteList" @selectedSong="_selectedSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll" ref="playList" v-show="currentIndex === 1" :data="playHistory">
          <div class="list-inner">
            <song-list :songArr="playHistory" @selectedSong="_selectedSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Switches from '_c/switches/switches'
import Scroll from '_c/scroll/scroll'
import SongList from '_c/song-list/song-list'
import { mapState, mapActions } from 'vuex'
import { Song } from '@/lib/utils'
export default {
  components: {
    Switches,
    Scroll,
    SongList
  },
  data () {
    return {
      currentIndex: 0,
      switches: [
        { name: '我喜欢的' },
        { name: '最近听的' }
      ]
    }
  },
  computed: {
    ...mapState(['favoriteList', 'playHistory'])
  },
  methods: {
    ...mapActions(['insertSong', 'randomPlay']),
    _switched (index) {
      this.currentIndex = index
    },
    _selectedSong (song) {
      this.insertSong(new Song({ id: song.id, name: song.name, time: song.time, singer: song.singer, picUrl: song.picUrl }))
    },
    _back () {
      this.$router.back()
    },
    _random () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      list.map(item => new Song({ id: item.id, name: item.name, time: item.time, singer: item.singer, picUrl: item.picUrl }))
      this.randomPlay({ list })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/variable';

.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 110px;
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

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
