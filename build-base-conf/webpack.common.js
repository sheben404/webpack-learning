const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {srcPath, distPath} = require('./paths')

module.exports = {
  entry: path.join(srcPath, 'index'),
  plugins: [
    new HtmlWebpackPlugin({
      // 模板文件路径
      template: path.join(srcPath, 'index.html'),
      // 打包出的 html 模板文件的名字
      filename: 'index.html'
    })
  ],
}
