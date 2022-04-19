const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      title: '插画拼图',
    },
  },
  publicPath: './',
  transpileDependencies: true,
})
