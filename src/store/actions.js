import { shuffle } from '@/lib/tools'
import { saveSearch, deleteSearch, clearSearch } from '@/lib/utils'

const actions = {
  selectPlay ({ commit, state }, { index, list }) {
    if (state.mode === 2) {
      const randomList = shuffle(list)
      index = randomList.findIndex(item => item.id === list[index].id)
      commit('SET_PLAYLIST', randomList)
      commit('SET_CURRENT_INDEX', index)
    } else {
      commit('SET_PLAYLIST', list)
      commit('SET_CURRENT_INDEX', index)
    }
    commit('SET_SEQUENCE_LIST', list)
    commit('SET_FULL_SCREEN', true)
    commit('SET_PLAYING_STATE', true)
  },
  randomPlay ({ commit }, { list }) {
    commit('SET_PLAY_MODE', 2)
    commit('SET_SEQUENCE_LIST', list)
    commit('SET_PLAYLIST', shuffle(list))
    commit('SET_CURRENT_INDEX', 0)
    commit('SET_FULL_SCREEN', true)
    commit('SET_PLAYING_STATE', true)
  },
  insertSong ({ commit, state }, song) {
    let playList = state.playList
    let sequenceList = state.sequenceList
    let currentIndex = state.currentIndex
    // 记录下当前歌曲
    let currentSong = playList[currentIndex]
    // 查找当前列表是否有待插入的歌曲
    let findHasIndexInPlayList = playList.findIndex(item => item.id === song.id)
    // 插入歌曲 所以索引加一
    currentIndex++
    // 插入这首歌到当前索引位置
    playList.splice(currentIndex, 0, song)
    // 如果已经包含这首歌
    if (findHasIndexInPlayList > -1) {
      if (currentIndex > findHasIndexInPlayList) {
        playList.splice(findHasIndexInPlayList, 1)
        currentIndex--
      } else {
        playList.splice(findHasIndexInPlayList + 1, 1)
      }
    }
    let currentSequenceIndex = sequenceList.findIndex(item => item.id === currentSong.id)
    let findHasIndexInSequenceList = sequenceList.findIndex(item => item.id === song.id)
    sequenceList.splice(currentSequenceIndex, 0, song)
    if (findHasIndexInSequenceList > -1) {
      if (currentSequenceIndex > findHasIndexInSequenceList) sequenceList.splice(findHasIndexInSequenceList, 1)
      else sequenceList.splice(findHasIndexInSequenceList + 1, 1)
    }
    commit('SET_PLAYLIST', playList)
    commit('SET_SEQUENCE_LIST', sequenceList)
    commit('SET_CURRENT_INDEX', currentIndex)
    commit('SET_FULL_SCREEN', true)
    commit('SET_PLAYING_STATE', true)
  },
  saveSearchHistory ({ commit }, query) {
    commit('SET_SEARCH_HISTORY', saveSearch(query))
  },
  deleteSearchHistory ({ commit }, query) {
    commit('SET_SEARCH_HISTORY', deleteSearch(query))
  },
  clearSeachHistory ({ commit }) {
    commit('SET_SEARCH_HISTORY', clearSearch())
  }
}

export default actions
