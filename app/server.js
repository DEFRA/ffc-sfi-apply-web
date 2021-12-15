const hapi = require('@hapi/hapi')
const config = require('./config')
const catbox = config.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')
const catboxOptions = config.useRedis ? config.cacheConfig.options : {}

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    cache: [{
      provider: {
        constructor: catbox,
        options: catboxOptions
      }
    }],
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  const cache = await server.cache({ segment: 'sessions', expiresIn: config.cacheConfig.expiresIn })
  server.app.cache = cache

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/cookies'))
  await server.register(require('@hapi/cookie'))
  await server.register(require('./plugins/auth'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register(require('./plugins/crumb'))
  await server.register(require('./plugins/logging'))

  if (config.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = createServer
