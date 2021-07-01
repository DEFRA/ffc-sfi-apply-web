const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, token) {
  return wreck.get(`${config.chApi}${url}`, { rejectUnauthorized: false })
}

module.exports = {
  get
}
