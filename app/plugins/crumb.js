const { cookieOptions } = require('../config')

console.log(cookieOptions)

module.exports = {
  plugin: require('@hapi/crumb'),
  options: {
    cookieOptions: {
      ttl: 31536000000,
      isSameSite: 'Lax',
      isSecure: true,
      isHttpOnly: true,
      clearInvalid: false,
      strictHeader: true
    }
  }
}
