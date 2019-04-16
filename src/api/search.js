import axios from './index'

export const getHotKey = () => {
  return axios.request({
    url: '/search/hot',
    method: 'get'
  })
}

export const searchHotKey = ({ query, page = 1, limit = 30 }) => {
  if (!query) return Promise.resolve()
  const offset = (page - 1) * limit
  return axios.request({
    url: `/search?keywords=${query}&offset=${offset}`,
    method: 'get'
  })
}

export const searchHotKeySuggest = ({ query = '' }) => {
  return axios.request({
    url: `/search/suggest?keywords=${query}`,
    method: 'get'
  })
}
