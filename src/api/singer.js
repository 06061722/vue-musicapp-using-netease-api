import axios from './index'
export const getSingerList = (limit = 50) => {
  return axios.request({
    url: `/top/artists?offset=0&limit=${limit}`,
    method: 'get'
  })
}
