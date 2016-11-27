/* eslint no-console: off */
const env = require('../../config/environment')
const Hapi = require('hapi')
const plugins = require('./plugins')

const server = new Hapi.Server()
server.connection({
  host: env.get('host'),
  labels: 'web',
  port: env.get('port')
})

server.register(plugins)

server.start((err) => {
  if (err) {
    throw err
  }
  console.info('Server running at:', server.info.uri)
})
