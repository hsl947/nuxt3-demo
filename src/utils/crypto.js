import MD5 from 'crypto-js/md5'

// md5加密
export const getSignStr = (str) => {
  return MD5(str).toString()
}
