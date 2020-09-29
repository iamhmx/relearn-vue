const config = require('./webpack.config')
const webpack = require('./src/webpack')

new webpack(config).run()
