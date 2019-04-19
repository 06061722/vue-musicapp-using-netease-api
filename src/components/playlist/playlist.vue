<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click.self="_hide">
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="_changeMode"></i>
            <span class="text">{{ modeText }}</span>
            <span class="clear" @click="_showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" ref="listContent" :data="sequenceList">
          <transition-group name="list" tag="ul">
            <li
              class="item"
              ref="listItem"
              v-for="(item, index) in sequenceList"
              :key="item.id"
              @click="_selectItem(item, index)"
            >
              <i class="current" :class="_getCurrentIcon(item)"></i>
              <span class="text">{{ item.name }}</span>
              <span class="like">
                <i></i>
              </span>
              <span class="delete" @click.stop="_deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="_hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="_confirmClear"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapActions } from 'vuex'
import { playerMixin } from '@/lib/mixin'
import Scroll from '_c/scroll/scroll'
import Confirm from '_c/confirm/confirm'
export default {
  mixins: [playerMixin],
  components: {
    Scroll,
    Confirm
  },
  data () {
    return {
      showFlag: false
    }
  },
  computed: {
    ...mapState({
      playList: state => state.playList,
      sequenceList: state => state.sequenceList,
      currentSong: state => state.playList[state.currentIndex],
      mode: state => state.mode
    }),
    modeText () {
      return this.mode === 0 ? '顺序播放' : this.mode === 1 ? '单曲循环' : '随机播放'
    }
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INDEX', 'SET_PLAYING_STATE']),
    ...mapActions(['deleteSong', 'deleteSongList']),
    _show () {
      this.showFlag = true
      this.$nextTick(() => {
        this.$refs.listContent._refresh()
        this._scrollToCurrent(this.currentSong)
      })
    },
    _hide () {
      this.showFlag = false
    },
    _getCurrentIcon (item) {
      if (this.currentSong.id === item.id) return 'icon-play'
      else return ''
    },
    _selectItem (item, index) {
      if (this.mode === 2) index = this.playList.findIndex(song => song.id === item.id)
      this.SET_CURRENT_INDEX(index)
      this.SET_PLAYING_STATE(true)
    },
    _scrollToCurrent (current) {
      const index = this.sequenceList.findIndex(song => song.id === current.id)
      this.$refs.listContent._scrollToElement(this.$refs.listItem[index], 300)
    },
    _deleteOne (item) {
      this.deleteSong(item)
      if (!this.playList.length) this._hide()
    },
    _showConfirm () {
      this.$refs.confirm._show()
    },
    _confirmClear () {
      this.deleteSongList()
      this._hide()
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) return
      this._scrollToCurrent(newSong)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';
@import '../../assets/stylus/mixin';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter, .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
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

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter, &.list-leave-to {
          height: 0;
        }

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .like {
          extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
