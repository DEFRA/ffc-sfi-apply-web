const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, crn, token) {
  return wreck.get(`${config.chApiGateway}${url}`, { headers: { crn, Authorization: `Bearer ${token}` }, json: true, rejectUnauthorized: false })
}

module.exports = {
  get
}
