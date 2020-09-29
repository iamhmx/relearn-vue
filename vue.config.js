/*
 * @Author: mingxing.huang
 * @Date: 2020-07-09 17:48:47
 */
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? '/' : '/',
  devServer: {
    open: true
  },
  configureWebpack: config => {
    // 线上开启压缩
    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096 // 超过4kb，开启压缩
        })
      )
    }
  },
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias.set('@', resolve('src'))
    // 配置svg-loader
    // config.module.rules.delete("svg"); // 删除默认配置中处理svg,
    config.module.rule('svg').exclude.add(resolve('src/icons'))
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end() //处理svg目录
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: false
      })
  },
  css: {
    loaderOptions: {
      sass: {
        // sass-loader v9语法
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        }
      }
    }
  }
}
