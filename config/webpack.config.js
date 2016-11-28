/* eslint no-ternary: off */
'use strict'

const CompressionPlugin = require('compression-webpack-plugin')
const env = require('./environment')
const path = require('path')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const webpack = require('webpack')

const isProd = env.get('env') === 'production'
const Entries = {
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
}

const JSLoaders = {
  default: ['babel'],
  development: []
}

const Plugins = {
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
}

function defineEnvSpecific (definitions, currentEnv) {
  let set = definitions.default || []
  if (currentEnv === 'development') {
    set = (definitions.development || []).concat(set)
  } else {
    set = (definitions.nonDevelopment || []).concat(set)
  }
  return set
}

const config = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
  entry: {
    client: defineEnvSpecific(Entries.client, env.get('env')),
    presenter: defineEnvSpecific(Entries.presenter, env.get('env'))
  },
  module: {
    loaders: [{
      include: env.get('sourcePath'),
      loaders: defineEnvSpecific(JSLoaders, env.get('env')),
      test: /\.jsx?$/
    }, {
      loader: 'expose?React',
      test: require.resolve('react')
    }]
  },
  output: {
    filename: '[name].js',
    path: env.get('distPath'),
    publicPath: '/'
  },
  plugins: defineEnvSpecific(Plugins, env.get('env')),
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx']
  }
}

module.exports = config
