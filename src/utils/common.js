// 获取校验失败的字段
import { removeToken, getToken } from '@/utils/auth.js'
import useUserStore from '@/stores/modules/user.js'
import { logout } from '@/api/user.js'

export function getFailedKeys(obj) {
  return Object.keys(obj).filter((key) => obj[key] === 'failed')
}

// 获取并解析 hash 参数的函数
export function getHashParams(str) {
  // 获取 hash 部分并去除开头的 '#'
  const hash = str.substring(1)

  // 拆分成键值对数组
  const params = hash.split('&')

  // 使用对象存储解析后的参数
  const result = {}

  params.forEach((param) => {
    // 拆分每个键值对
    const [key, value] = param.split('=')
    if (key && value) {
      result[key] = decodeURIComponent(value)
    }
  })

  return result
}

// 获取并解析 search 参数的函数
export function getSearchParams(str) {
  // 获取 hash 部分并去除开头的 '?'
  const search = str.substring(1)

  // 拆分成键值对数组
  const params = search.split('&')

  // 使用对象存储解析后的参数
  const result = {}

  params.forEach((param) => {
    // 拆分每个键值对
    const [key, value] = param.split('=')
    if (key && value) {
      result[key] = decodeURIComponent(value)
    }
  })

  return result
}

// 退出登录操作
export function logoutAction() {
  logout({ token: getToken() }).then((res) => {
    removeToken()
    useUserStore().setUserInfo({})
    window.location.replace('/')
  })
}
