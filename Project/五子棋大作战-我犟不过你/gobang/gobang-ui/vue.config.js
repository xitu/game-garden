const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//是否在保存时检查
  devServer: {
    host: 'localhost',//本机ip
    port: 8080,//本机端口
    open: true,
    proxy: {
      '/dev-api': {  //代理别名
        target: process.env.VUE_APP_BASE_URL, // 对应的代理地址
        changeOrigin: true,
        secure: true,
        pathRewrite:{  //替换路径中的/api
          '^/dev-api':''
        }
      }
    }
  },
  chainWebpack: config => {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    if (process.env.NODE_ENV === 'production') {
      config.plugin('CompressionPlugin').use(
          new CompressionWebpackPlugin({
            test: /\.(js|css)$/,
            threshold: 10240, // 超过10kb的文件就压缩
            deleteOriginalAssets:true, // 不删除源文件
            minRatio: 0.8
          })
      )
    }
  }
})
