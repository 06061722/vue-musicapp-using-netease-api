const KEY = '__searchHistory__'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: 0,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: (() => localStorage.getItem(KEY) === null ? [] : JSON.parse(localStorage.getItem(KEY)))()
}

export default state
