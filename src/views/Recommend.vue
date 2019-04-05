<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="playList">
      <div>
        <div class="slider-wrapper">
          <slider :banners="banners" @onImgLoaded="_onImgLoaded"></slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) in playList" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl" alt>
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.nickname }}</h2>
                <p class="desc">{{ item.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import { getRecommend, getPlayList } from '@/api/recommend'
import Slider from '_c/slider/slider'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      banners: [],
      playList: []
    }
  },
  methods: {
    filterBanners (banners) {
      return banners.filter(item => item.targetType === 1 || item.targetType === 10)
    },
    _getRecommend () {
      getRecommend().then(res => {
        if (!res === 200) return
        const filteredBanners = this.filterBanners(res.banners)
        this.banners = filteredBanners
      })
      getPlayList().then(res => {
        if (!res === 200) return
        this.playList = res.playlists
      })
    },
    _onImgLoaded () {
      this.$refs.scroll._refresh()
    }
  },
  created () {
    this._getRecommend()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
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
