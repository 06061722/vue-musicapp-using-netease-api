const mutations = {
  SET_SINGER (state, singer) { state.singer = singer },
  SET_PLAYING_STATE (state, flag) { state.playing = flag },
  SET_FULL_SCREEN (state, flag) { state.fullScreen = flag },
  SET_PLAYLIST (state, list) { state.playList = list },
  SET_SEQUENCE_LIST (state, list) { state.sequenceList = list },
  SET_PLAY_MODE (state, flag) { state.mode = flag },
  SET_CURRENT_INDEX (state, index) { state.currentIndex = index }
}

export default mutations
