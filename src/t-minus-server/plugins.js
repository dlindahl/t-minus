const config = require('../../config/webpack.config');
const env = require('../../config/environment');
const plugins = [];
const webpack = require('webpack');

if(env.get('env') === 'development') {
  plugins.push({
    register: require('hapi-webpack-plugin'),
    options: {
      compiler: webpack(config),
      assets: { // webpack-dev-middleware options
        historyApiFallback: true,
        hot: true,
        noInfo: true,
        publicPath: config.output.publicPath
      }
    }
  });
}

module.exports = plugins;
