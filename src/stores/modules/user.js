import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  // 开启数据持久化
  persist: true,
  state: () => ({
    lang: 'en',
    game: {},
    activeOpenType: '',
    userInfo: {},
    rememberMe: false,
    storeUsername: '',
    currentPackage: {},
    storeGoods: null
  }),
  actions: {
    // 保存当前语言
    setLang(val) {
      this.lang = val
    },
    // 保存当前游戏
    setGame(val) {
      this.game = val
    },
    // 保存当前登录类型
    setOpenType(val) {
      this.activeOpenType = val
    },
    // 保存用户信息
    setUserInfo(val) {
      this.userInfo = val
    },
    // 保存用户信息
    setRememberMe(val) {
      this.rememberMe = val
    },
    // 保存用户信息
    setStoreUsername(val) {
      this.storeUsername = val
    },
    // 保存商品列表信息数据
    setStoreGoods(val) {
      this.storeGoods = val
    }
  }
})

export default useUserStore
