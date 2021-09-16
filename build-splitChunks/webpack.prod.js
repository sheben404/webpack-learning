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
      filename: 'css/main.[contenthash:8].css'
    })
  ],

  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口chunk，对于异步导入的文件不处理
       async 异步chunk，只对异步导入的文件处理
       all 全部chunk
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0,  // 大小限制
          minChunks: 1  // 最少复用过几次
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0,  // 公共模块的大小限制
          minChunks: 2  // 公共模块最少复用过几次
        }
      }
    }
  }
})
