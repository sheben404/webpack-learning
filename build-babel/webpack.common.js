const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {srcPath, distPath} = require('./paths')

module.exports = {
  // 入口文件
  entry: path.join(srcPath, 'index'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 一般来说 include、exclude 两者任选其一即可
        include: srcPath,        // 只对 src 目录下的 .js 文件进行编译
        exclude: /node_modules/  // 不对 node_modules 文件夹下的 .js 文件进行编译
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板采用下面 url 的文件
      template: path.join(srcPath, 'index.html'),
      // 打包出的文件用这个名字
      filename: 'index.html'
    })
  ]
}
