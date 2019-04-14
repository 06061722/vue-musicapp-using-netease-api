import axios from './index'
export const getRecommend = () => {
  return axios.request({
    url: '/banner',
    method: 'get'
  })
}

export const getPlayList = (limit = 30) => {
  return axios.request({
    url: `/top/playlist?limit=${limit}`,
    method: 'get'
  })
}

export const getDiscDetail = (discId) => {
  return axios.request({
    url: `/playlist/detail?id=${discId}`
  })
}
