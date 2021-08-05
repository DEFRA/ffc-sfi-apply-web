const { cookieOptions } = require('../config')

console.log(cookieOptions)

module.exports = {
  plugin: require('@hapi/crumb'),
  options: {
    cookieOptions: {
      isSecure: cookieOptions.isSecure
    }
  }
}
