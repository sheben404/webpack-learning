const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const {srcPath, distPath} = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    // filename: 'bundle.[contenthash:8].js',  // 打包代码时，加上 hash 戳
    filename: '[name].[contenthash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/inline'
      },
      // 抽离 css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
          'css-loader',
          'postcss-loader'
        ]
      },
      // 抽离 less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production')
    }),

    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ],

  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }
})
