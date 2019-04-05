<template>
  <div class="slider" ref="sliderWrapper">
    <div class="slider-group" ref="sliderGroup">
      <div class="slider-item" ref="slideritem" v-for="(item, index) in banners" :key="index">
        <a href="#">
          <img @load="_onImgLoaded" :src="item.imageUrl">
        </a>
      </div>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in banners"
        :key="index"
        :class="{active: currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      currentPageIndex: 0,
      back: false
    }
  },
  methods: {
    _setSliderWidth () {
      let sliderWidth = this.$refs.sliderWrapper.clientWidth
      this.$refs.sliderGroup.style.width = this.banners.length * sliderWidth + 2 * sliderWidth + 'px'
      this.$refs.slideritem.forEach(item => { item.style.width = sliderWidth + 'px' })
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.sliderWrapper, {
        scrollX: true,
        click: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          easing: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function (t) {
              return t * (2 - t)
            }
          }
        }
      })
      this.slider.on('scrollEnd', () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _onImgLoaded () {
      if (!this.checkImgLoaded) {
        this.$emit('onImgLoaded')
        this.checkImgLoaded = true
      }
    }
  },
  watch: {
    banners () {
      this.$nextTick(() => {
        this._setSliderWidth()
        this._initSlider()
        if (this.autoPlay) this._play()
      })
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.slider.destroy()
      this._setSliderWidth()
      this._initSlider()
      if (this.autoPlay) this._play()
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
