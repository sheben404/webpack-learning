const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {cleanWebpackPlugin, CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  // 配置模块的入口，可抽象成输入
  // webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块
  // entry 配置是必填的，如果不填则将导致 webpack 报错退出
  // 这里我们将 src/index.js 作为入口点
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },

  // 配置 output 选项可以控制 webpack 如何向硬盘写入编译后文件
  // 即使可以存在多个入口起点，但是只能制定一个「输出」配置。
  // 这里我们制定输出配置为 dist
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      // 自定义 html 中的 title
      title: 'webpack Boilerplate',
      // 作为模板的文件
      template: path.resolve(__dirname, './src/template.html'),
      // 作为输出的文件
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ]
}
