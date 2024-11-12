import request from '@/utils/request'

const prefix = '/api'
// 账号密码登录
export function login(data) {
  return request({
    url: prefix + '/web/user/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout(data) {
  return request({
    url: prefix + '/web/user/logout',
    method: 'post',
    data
  })
}

// 重置密码
export function sendEmailCode(data) {
  return request({
    url: prefix + '/web/user/pwd/reset',
    method: 'post',
    data
  })
}
