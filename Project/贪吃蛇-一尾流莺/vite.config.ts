/*
 * @Author: 一尾流莺
 * @Description:vite配置文件
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-27 14:34:13
 * @FilePath: \warbler-games\贪吃蛇\vite.config.ts
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: './',
  // 定义别名
  alias: {
    '@': path.resolve(__dirname, 'src'),
    coms: path.resolve(__dirname, 'src/components'),
    assets: path.resolve(__dirname, 'src/assets'),
    router: path.resolve(__dirname, 'src/router'),
    styles: path.resolve(__dirname, 'src/styles'),
    utils: path.resolve(__dirname, 'src/utils'),
    base: path.resolve(__dirname, 'src/baseComponents'),
    hooks: path.resolve(__dirname, 'src/hooks'),
  },
  plugins: [vue()],
});
