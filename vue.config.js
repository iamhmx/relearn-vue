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