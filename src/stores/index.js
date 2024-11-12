import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const store = createPinia()
// pinia 数据持久化
store.use(piniaPluginPersistedstate)

export default store
