import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import px2rem from 'postcss-pxtorem'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const { VITE_CDN_URL } = loadEnv(mode, process.cwd())
  return {
    base: VITE_CDN_URL, // 替换为你的 CDN 根路径
    server: {
      port: 8011,
      host: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/api': {
          target: 'https://apilogin-dev.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({
        resolvers: []
      }),
      Components({
        resolvers: []
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/_variables.scss";'
        }
      },
      postcss: {
        plugins: [
          px2rem({
            rootValue: 75, // 根元素字体大小
            unitPrecision: 5, // 允许REM单位增长到的十进制数
            propList: ['*'], // 能转化为rem的属性列表
            selectorBlackList: [], // 忽略的选择器
            replace: true, // 替换包含rems的规则
            mediaQuery: false, // 允许在媒体查询中转换px
            minPixelValue: 0, // 设置要替换的最小像素值
            exclude: (file) => /node_modules\/(vant|antd)/i.test(file) // 动态排除
          })
        ]
      }
    }
  }
})
