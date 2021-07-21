const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, callerId) {
  return wreck.get(`${config.chApiGateway}${url}`, { headers: { callerId: callerId }, json: true, rejectUnauthorized: false })
}

module.exports = {
  get
}
