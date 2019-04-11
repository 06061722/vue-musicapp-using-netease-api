<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="_progressTouchStart"
        @touchmove.prevent="_progressTouchMove"
        @touchend="_progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from '@/lib/tools'

const PROGRESSBTNWIDTH = 16
const TRANSFORM = prefixStyle('transform')
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _progressTouchStart (e) {
      this.touch.initated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    _progressTouchMove (e) {
      if (!this.touch.initated) return
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    _progressTouchEnd () {
      this.touch.initated = false
      this._triggerPercent()
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[TRANSFORM] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _triggerPercent () { // 不是在每个方法里去调用dom，要把dom的样式跟computed里的某些值绑定在一起，需要重构
      const barWidth = this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    percent (newVal) {
      if (newVal >= 0 && !this.touch.initated) {
        const barWidth = this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH
        const offsetWidth = newVal * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  created () {
    this.touch = {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
