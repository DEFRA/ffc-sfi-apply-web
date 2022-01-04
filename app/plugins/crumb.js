const config = require('../config').cookieConfig

module.exports = {
  plugin: require('@hapi/crumb'),
  options: {
    cookieOptions: {
      isSecure: config.isSecure
    }
  }
}
