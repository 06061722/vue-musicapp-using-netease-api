<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="rankList" ref="rankList">
      <ul>
        <li
          class="item"
          v-for="(item, index) in rankList"
          :key="index"
          @click="_selectedItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.tracks" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.first}}-{{song.second}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!rankList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRankList } from '@/api/rank'
import { playListMixin } from '@/lib/mixin'
import { mapMutations } from 'vuex'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
export default {
  mixins: [playListMixin],
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      rankList: []
    }
  },
  methods: {
    ...mapMutations(['SET_TOP_LIST']),
    handlePlayList () {
      const bottom = this.playList.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.rankList._refresh()
    },
    _getRankList () {
      getRankList().then(res => {
        if (res.code === 200) {
          this.rankList = res.list
        }
      })
    },
    _selectedItem (item) {
      this.SET_TOP_LIST(item)
      this.$router.push({
        path: `/rank/${item.id}`
      })
    }
  },
  created () {
    this._getRankList()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/variable';
@import '../assets/stylus/mixin';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;

        .song {
          no-wrap();
          line-height: 26px;
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
