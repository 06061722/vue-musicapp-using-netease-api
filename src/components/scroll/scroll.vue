<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        const me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      if (this.pullUp) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) this.$emit('scrollToEnd')
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    _enable () {
      this.scroll && this.scroll.enable()
    },
    _disable () {
      this.scroll && this.scroll.disable()
    },
    _refresh () {
      this.scroll && this.scroll.refresh()
    },
    _scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    _scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._refresh()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  }
}
</script>
<style lang="stylus" scoped></style>
