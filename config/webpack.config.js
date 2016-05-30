/* eslint-disable no-var */
'use strict';

var config;
var env = require('./environment');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var webpack = require('webpack');

var Entries = {
  client: {
    default: [
      path.join(env.get('sourcePath'), 'web', 'client')
    ],
    development: [
      'webpack-hot-middleware/client'
    ]
  }
};

var JSLoaders = {
  default: ['babel'],
  development: ['react-hot']
};

var NodeModules = path.join(__dirname, '../node_modules');

var Plugins = {
  default: [
    new TransferWebpackPlugin([
      {
        from: path.join(env.get('sourcePath'), 'web', 'assets'),
        to: '.'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.get('env'))
      }
    })
  ],
  development: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

function defineEnvSpecific(definitions, env) {
  var set = definitions.default || [];
  if(env === 'development') {
    set = (definitions.development || []).concat(set);
  } else {
    set = (definitions.nonDevelopment || []).concat(set);
  }
  return set;
}

config = {
  devtool: 'eval',
  entry: {
    client: defineEnvSpecific(Entries.client, env.get('env')),
  },
  output: {
    path: env.get('distPath'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: defineEnvSpecific(Plugins, env.get('env')),
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: defineEnvSpecific(JSLoaders, env.get('env')),
      include: env.get('sourcePath')
    }, {
      test: require.resolve('react'),
      loader: 'expose?React'
    }]
  }
};

module.exports = config;