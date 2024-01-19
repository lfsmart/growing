import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 启用 javascript
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 是否关闭浏览器错误信息
  server: {
    hmr: {
      overlay: true
    },
    proxy: {
      '^/api': 'http://localhost:3000'
    }
  }
})
