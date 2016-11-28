const config = require('../../config/webpack.config')
const env = require('../../config/environment')
const webpack = require('webpack')

const plugins = []

if (env.get('env') === 'development') {
  plugins.push({
    options: {
      assets: { // See also: webpack-dev-middleware
        historyApiFallback: true,
        hot: true,
        noInfo: true,
        publicPath: config.output.publicPath
      },
      compiler: webpack(config)
    },
    register: require('hapi-webpack-plugin')
  })
}

module.exports = plugins
