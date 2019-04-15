import axios from './index'

export const getHotKey = () => {
  return axios.request({
    url: '/search/hot',
    method: 'get'
  })
}

export const searchHotKey = (query, page) => {
  const offset = page * 30
  return axios.request({
    url: `/search?keywords=${query}&offset=${offset}`,
    method: 'get'
  })
}

export const searchHotKeySuggest = (query) => {
  return axios.request({
    url: `/search/suggest?keywords=${query}`,
    method: 'get'
  })
}
