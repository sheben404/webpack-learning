const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const {merge} = require('webpack-merge')
const {srcPath, distPath} = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: distPath,  // 对 dist 目录启动本地 sever
    open: true,             // 自动打开浏览器窗口
    compress: true,         // 是否压缩代码
    hot: true,              // 是否热更新
    port: 8080,

    // 设置代理 —— 如果有需要的话！
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  },
  plugins: [
    // 在编译时定义全局变量
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('development')
    })
  ]
})
