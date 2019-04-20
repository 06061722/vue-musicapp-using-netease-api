import { mapState, mapMutations } from 'vuex'
import { shuffle } from '@/lib/tools'
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

export const playerMixin = {
  computed: {
    ...mapState({
      mode: state => state.mode
    }),
    iconMode () { // 0: sequence, 1: loop, 2: random
      return this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-loop' : 'icon-random'
    }
  },
  methods: {
    ...mapMutations(['SET_PLAY_MODE', 'SET_PLAYLIST', 'SET_CURRENT_INDEX']),
    _changeMode () {
      const mode = (this.mode + 1) % 3
      this.SET_PLAY_MODE(mode)
      let list = []
      if (mode === 2) list = shuffle(this.sequenceList)
      else list = this.sequenceList
      let index = list.findIndex(item => item.id === this.currentSong.id)
      this.SET_PLAYLIST(list)
      this.SET_CURRENT_INDEX(index)
    }
  }
}

export const searchMixin = {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    _addQuery (query) {
      this.$refs.searchBox._setQuery(query)
    },
    _onQueryChange (query) {
      this.query = query
    },
    _blurInput () {
      this.$refs.searchBox._blur()
    }
  }
}
