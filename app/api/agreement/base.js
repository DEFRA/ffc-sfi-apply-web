const wreck = require('@hapi/wreck')
const config = require('../../config')

const get = async (url, callerId) => {
  return wreck.get(`${config.agreementApiEndpoint}${url}`, { json: true })
}

module.exports = {
  get
}
