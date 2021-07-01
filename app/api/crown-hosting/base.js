const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, token) {
  console.log(`CH API GATEWAY: ${config.chApi}${url}`)
  return wreck.get(`${config.chApiGateway}${url}`, { rejectUnauthorized: false })
}

module.exports = {
  get
}
