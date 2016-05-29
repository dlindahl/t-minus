/* eslint-disable no-var */
'use strict';

var config;
var convict = require('convict');
var path = require('path');
var Root = path.resolve('.');

config = convict({
  distPath: {
    doc: 'The path that distributed files are served from',
    format: String,
    default: path.join(Root, 'dist'),
    env: 'DIST_PATH'
  },
  env: {
    doc: 'The application environment',
    format: ['production', 'staging', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    doc: 'Hostname the application runs on',
    format: 'url',
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'Port the application listens on',
    format: 'port',
    default: 8030,
    env: 'PORT'
  },
  sourcePath: {
    doc: 'The path that the source assets are stored in',
    format: String,
    default: path.join(Root, 'src/t-minus-client')
  }
});

config.validate();

module.exports = config;
