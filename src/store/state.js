const SEARCH = '__searchHistory__'
const PLAY = '__playHistory__'
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
  searchHistory: (() => localStorage.getItem(SEARCH) === null ? [] : JSON.parse(localStorage.getItem(SEARCH)))(),
  playHistory: (() => localStorage.getItem(PLAY) === null ? [] : JSON.parse(localStorage.getItem(PLAY)))()
}

export default state
