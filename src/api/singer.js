import axios from './index'
export const getSingerList = (limit = 50) => {
  return axios.request({
    url: `/top/artists?offset=0&limit=${limit}`,
    method: 'get'
  })
}

export const getSingerDetail = (singerId = -1) => {
  if (singerId === -1) return
  return axios.request({
    url: `/artists?id=${singerId}`,
    method: 'get'
  })
}

export const getSongDetail = (songId = -1) => {
  if (songId === -1) return
  return axios.request({
    url: `/song/url?id=${songId}`,
    method: 'get'
  })
}
