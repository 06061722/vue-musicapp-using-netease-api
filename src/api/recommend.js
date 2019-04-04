import axios from './index'
export const getRecommend = () => {
  return axios.request({
    url: '/banner',
    method: 'get'
  })
}
