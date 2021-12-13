const config = require('../config')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: false,
    maxCookieSize: config.useRedis ? 0 : 1024,
    cache: {
      cache: 'session',
      expiresIn: config.cacheConfig.defaultExpiresIn
    },
    cookieOptions: {
      password: config.cookiePassword,
      isSecure: config.cookieOptions.isSecure,
      ttl: config.cookieOptionsIdentity.ttl
    },
    customSessionIDGenerator: function (request) {
      return uuidv4()
    }
  }
}
