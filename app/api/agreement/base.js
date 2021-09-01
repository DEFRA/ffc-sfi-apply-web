const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, callerId) {
  return wreck.get(`${config.agreementApiEndpoint}${url}`, { json: true })
}

module.exports = {
  get
}
