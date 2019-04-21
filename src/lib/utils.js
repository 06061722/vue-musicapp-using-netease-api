import { getLyric } from '@/api/singerandsong'

export class Singer {
  constructor ({ id, name, picUrl }) {
    this.id = id
    this.name = name
    this.picUrl = picUrl
  }
}

export class Song {
  constructor ({ id, name, time, singer, picUrl }) {
    this.id = id
    this.name = name
    this.time = time
    this.singer = singer
    this.picUrl = picUrl
  }
  getLyric () {
    if (this.lyric) return Promise.resolve(this.lyric)
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if (res.code === 200) {
          this.lyric = res.lrc ? res.lrc.lyric : ''
          resolve(this.lyric)
        } else {
          reject(new Error('No lyric'))
        }
      })
    })
  }
}

export const createSongArr = (hotSongs) => {
  let songArr = []
  let id
  let name
  let time
  let singer
  let picUrl
  hotSongs.forEach(item => {
    singer = ''
    item.ar.forEach(item => {
      singer += item.name + '/'
    })
    singer = singer.slice(0, -1)
    picUrl = item.al.picUrl
    time = item.dt
    name = item.name
    id = item.id
    const song = new Song({ id, name, time, singer, picUrl })
    songArr.push(song)
  })
  return songArr
}

export const createSearchSong = (searchList) => {
  let songArr = []
  let id
  let name
  let time
  let singer
  let picUrl
  searchList.forEach(item => {
    singer = ''
    item.artists.forEach(item => {
      singer += item.name + '/'
    })
    singer = singer.slice(0, -1)
    picUrl = item.artists[0].img1v1Url
    time = item.duration
    name = item.name
    id = item.id
    const song = new Song({ id, name, time, singer, picUrl })
    songArr.push(song)
  })
  return songArr
}

const SEARCHHISTORY_MAX_LEN = 15
const HISTORY_KEY = '__searchHistory__'
function insertToArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) return
  if (index > 0) arr.splice(index, 1)
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) arr.pop()
}

export const saveSearch = (query) => {
  let searchHistoryArr = localStorage.getItem(HISTORY_KEY) === null ? [] : JSON.parse(localStorage.getItem(HISTORY_KEY))
  insertToArray(searchHistoryArr, query, item => item === query, SEARCHHISTORY_MAX_LEN)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistoryArr))
  return searchHistoryArr
}
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) arr.splice(index, 1)
}

export const deleteSearch = (query) => {
  let searchHistoryArr = JSON.parse(localStorage.getItem(HISTORY_KEY))
  deleteFromArray(searchHistoryArr, item => item === query)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistoryArr))
  return searchHistoryArr
}

export const clearSearch = () => {
  localStorage.removeItem(HISTORY_KEY)
  return []
}

const PLAY_KEY = '__playHistory__'
const PLAYHISTORY_MAX_LEN = 100

export function savePlay (song) {
  let playHistoryArr = localStorage.getItem(PLAY_KEY) === null ? [] : JSON.parse(localStorage.getItem(PLAY_KEY))
  insertToArray(playHistoryArr, song, item => item.id === song.id, PLAYHISTORY_MAX_LEN)
  localStorage.setItem(PLAY_KEY, JSON.stringify(playHistoryArr))
  return playHistoryArr
}

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 100

export function saveFavorite (song) {
  let favoriteArr = localStorage.getItem(FAVORITE_KEY) === null ? [] : JSON.parse(localStorage.getItem(FAVORITE_KEY))
  insertToArray(favoriteArr, song, item => item.id === song.id, FAVORITE_MAX_LEN)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteArr))
  return favoriteArr
}

export function deleteFavorite (song) {
  let favoriteArr = localStorage.getItem(FAVORITE_KEY) === null ? [] : JSON.parse(localStorage.getItem(FAVORITE_KEY))
  deleteFromArray(favoriteArr, item => item.id === song.id)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteArr))
  return favoriteArr
}
