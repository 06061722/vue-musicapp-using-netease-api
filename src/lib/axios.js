import axios from 'axios'
import { baseUrl } from '@/config'

class HttpRequest {
  constructor (baseURL = baseUrl) {
    this.baseURL = baseURL
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use(res => {
      const { data } = res
      return data
    }, error => {
      return Promise.reject(error.response.data)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)// Object.assign 合并对象，相同key值，用后者覆盖

    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
