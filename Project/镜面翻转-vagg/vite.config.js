import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
// import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  base: './',
  server:{
    port: 4000,
    host: '0.0.0.0',
    open: true
  },
  plugins: [
    vue(),
    Pages(),
    // Layouts({
    //   layoutsDirs: 'src/layouts',
    //   defaultLayout: 'myDefault'
    // }),
    Components(),
    WindiCSS(),
  ],
})
