const config = require('../config')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: true,
    maxCookieSize: config.useRedis ? 0 : 1024,
    cache: {
      cache: 'session',
      expiresIn: config.sessionTimeoutMinutes * 60 * 1000
    },
    cookieOptions: {
      password: config.cookiePassword,
      isSecure: config.cookieOptions.isSecure
    },
    customSessionIDGenerator: function (request) {
      return uuidv4()
    }
  }
}
