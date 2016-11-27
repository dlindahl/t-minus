'use strict'

const convict = require('convict')
const path = require('path')
const Root = path.resolve('.')

const config = convict({
  distPath: {
    default: path.join(Root, 'dist'),
    doc: 'The path that distributed files are served from',
    env: 'DIST_PATH',
    format: String
  },
  env: {
    default: 'development',
    doc: 'The application environment',
    env: 'NODE_ENV',
    format: ['production', 'staging', 'development', 'test']
  },
  host: {
    default: '0.0.0.0',
    doc: 'Hostname the application runs on',
    env: 'HOST',
    format: 'url'
  },
  port: {
    default: 8030,
    doc: 'Port the application listens on',
    env: 'PORT',
    format: 'port'
  },
  sourcePath: {
    default: path.join(Root, 'src/t-minus-client'),
    doc: 'The path that the source assets are stored in',
    format: String
  }
})

config.validate()

module.exports = config
