<template>
  <div class="song-list">
    <ul>
      <li @click="selectedSong(song, index)" v-for="(song, index) in songArr" :key="index" class="item">
        <div class="rank" v-show="rank">
          <span :class="_getRankCls(index)">{{ _getRankText(index) }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ song.singer }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    songArr: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectedSong (song, index) {
      this.$emit('selectedSong', song, index)
    },
    _getRankCls (index) {
      if (index <= 2) return `icon icon${index}`
      return 'text'
    },
    _getRankText (index) {
      if (index > 2) return index + 1
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/variable"
  @import "../../assets/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
