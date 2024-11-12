import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)

import App from './App.vue'
import router from './router'
import store from './stores'

// ConfigProvider 全局配置
import { ConfigProvider } from 'vant'
app.use(ConfigProvider)

// 引入模块后自动生效
import '@vant/touch-emulator'

// 全局引入，不推荐
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/reset.css'

// 全部按需引入
// import { Button } from 'ant-design-vue'
// app.use(Button)

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
