import { mapState } from 'vuex'
export const playListMixin = {
  computed: {
    ...mapState(['playList'])
  },
  mounted () {
    this.handlePlayList(this.playList)
  },
  activated () {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList (newVal) {
      this.handlePlayList(newVal)
    }
  },
  method: {
    handlePlayList () {
      throw new Error('Component must implement handlePlayList method')
    }
  }
}
