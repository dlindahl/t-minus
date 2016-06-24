/* eslint-disable no-var */
'use strict';

var CompressionPlugin = require('compression-webpack-plugin');
var config;
var env = require('./environment');
var isProd = env.get('env') === 'production';
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
  },
  presenter: {
    default: [
      path.join(env.get('sourcePath'), 'web', 'presenter')
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
    }),
    new CompressionPlugin({
      assert: '{file}.gz',
      regExp: /\.js/
    })
  ],
  development: [
    new webpack.HotModuleReplacementPlugin()
  ],
  nonDevelopment: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        beautify: false,
        comments: false,
        screw_ie8: true,
        space_colon: false
      }
    })
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
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
  entry: {
    client: defineEnvSpecific(Entries.client, env.get('env')),
    presenter: defineEnvSpecific(Entries.presenter, env.get('env'))
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
