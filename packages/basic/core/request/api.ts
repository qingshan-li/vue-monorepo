import axios from 'axios'
import { urlParse } from './utils'
import Loading from '../Loading'
import { message } from "ant-design-vue";

console.log("env-NODE_ENV", process.env.NODE_ENV)
axios.defaults.baseURL =
  process.env.NODE_ENV == "pro" ? "https://api.loopslive.com/2.0/op2/" : "https://api-test.loopslive.com/2.0/op2/";
//请求接口去掉loading白名单
const whiteList = []
// loading 次数
let loadingCount = 0
/* 拦截请求和响应 */
axios.interceptors.request.use(
  (config) => {
    let url = config.url
    let index = url.lastIndexOf('/')
    let params = url.substring(index + 1, url.length)
    let para = params.match(/(\S*)\?/)[1]
    if (whiteList.indexOf(para) === -1) {
      if (loadingCount === 0) {
        Loading()
      }
      loadingCount++
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (data) => {
    loadingCount--
    if (loadingCount === 0) {
      Loading.colse()
    }
    return data
  },
  (error) => {
    loadingCount--
    if (loadingCount === 0) {
      Loading.colse()
    }

    console.log(error?.response?.data, 'error')
    if (error?.response?.data?.success === false) {
      message.error(error?.response?.data?.message)
    } else {
      message.error("NETWORK ERROR")
    }
    return Promise.reject(error)
  }
)
function multipartToFormData(params) {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  return formData
}
const query: any = urlParse()
const defaultQuery = {
  uid: query.userId || 1006073,
  token: query.token || "bf6b13bd37ec4173b7b075dc92bf989a",
  time: Date.now(),
  accessToken: query.token || "bf6b13bd37ec4173b7b075dc92bf989a",
}
//接口请求数据
const userInfo = {
  userId: query.userId || 1006073,
  uid: query.userId || 1006073,
  accessToken: query.token || "bf6b13bd37ec4173b7b075dc92bf989a",
}

export class Api {
  url = "";
  options: any = {}
  method = ""
  multipart = false
  constructor(url, options) {
    this.url = this._addQuery(url)
    this.options = options || {}
    this.method = this.options.method || 'get'
    this.multipart = this.options.multipart || false
  }
  request(params) {
    const config = {
      url: this.url,
      method: this.method,
      params: {},
      data: {},
    }
    if (this.method === 'get') {
      config.params = params
    } else {
      if (this.options.multipart) {
        config.data = multipartToFormData(params)
      } else {
        config.data = { ...userInfo, ...params }
      }
    }
    Object.assign(config, this.options)
    return axios.request(config)
  }

  _addQuery(url) {
    let query = ''
    Object.keys(defaultQuery).map((key) => {
      query += `&${key}=${defaultQuery[key]}`
    })
    if (query) {
      query = '?' + query.slice(1)
    }
    return url + query
  }
}