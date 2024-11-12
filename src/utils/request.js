import axios from 'axios'
// import qs from 'qs'
import { getToken } from '@/utils/auth'
import { logoutAction } from '@/utils/common'

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/',
  // 超时
  timeout: 1000 * 60
})

/**
 * 参数get处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    let part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            let subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // get请求映射params参数
    if (config.method === 'get') {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    config.params = config.params || {}

    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 0
    // 获取错误信息
    const msg = res.data.msg
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }

    // 登录过期，非法等
    if ([107, 108, 109].includes(code)) {
      logoutAction()
      return Promise.reject(new Error(msg))
    }
    if (code !== 0) {
      return Promise.reject(new Error(msg))
    }

    return Promise.resolve(res.data)
  },
  (error) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
