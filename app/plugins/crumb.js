const cookieOptions = { ...require('../config').cookieOptions }
delete cookieOptions.encoding

module.exports = {
  plugin: require('@hapi/crumb'),
  options: {
    cookieOptions
  }
}
