const SEARCH = '__searchHistory__'
const PLAY = '__playHistory__'
const FAVORITE = '__favorite__'
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
  playHistory: (() => localStorage.getItem(PLAY) === null ? [] : JSON.parse(localStorage.getItem(PLAY)))(),
  favoriteList: (() => localStorage.getItem(FAVORITE) === null ? [] : JSON.parse(localStorage.getItem(FAVORITE)))()
}

export default state
