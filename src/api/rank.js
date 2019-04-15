import axios from './index'

export const getRankList = () => {
  return axios.request({
    url: '/toplist/detail',
    method: 'get'
  })
}

export const getRankListDetail = (rankListId) => {
  const reflect = {
    19723756: '3',
    3779629: '0',
    2884035: '2',
    3778678: '1'
  }
  return axios.request({
    url: `/top/list?idx=${reflect[rankListId]}`,
    method: 'get'
  })
}
