/*
 * @Author: mingxing.huang
 * @Date: 2020-07-09 17:48:47
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    css: {
        loaderOptions: {
            sass: {
                // sass-loader v9语法
                additionalData(content, loaderContext) {
                    const { resourcePath, rootContext } = loaderContext;
                    const relativePath = path.relative(rootContext, resourcePath);
                    if (
                        relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
                    ) {
                        return '@import "~@/styles/variables.scss";' + content;
                    }
                    return content;
                },
            }
        }
    }
}