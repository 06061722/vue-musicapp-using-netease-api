import { shuffle } from '@/lib/tools'

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
  }
}

export default actions
