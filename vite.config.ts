import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
// import styleImport, { AntdResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react(),
    // 使用按需加载会使全局样式被覆盖
    // styleImport({
    //   resolves: [
    //     AntdResolve()
    //   ]
    // })
  ],

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
    }
  }
});
