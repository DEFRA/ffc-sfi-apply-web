const wreck = require('@hapi/wreck')
const config = require('../config')
const { getParcels } = require('./parcels')
const { getLayers, postLayers } = require('./layers.js')

async function get (url, token) {
  return wreck.get(`${config.agreementCalculatorEndpoint}${url}`, getConfiguration(token))
}

async function post (url, data, token) {
  const { payload } = await wreck.post(`${config.agreementCalculatorEndpoint}${url}`, {
    payload: data,
    ...getConfiguration(token)
  })
  return payload
}

function getConfiguration (token) {
  return {
    headers: {
      Authorization: token ?? ''
    },
    json: true
  }
}

module.exports = {
  get,
  post,
  getParcels,
  getLayers,
  postLayers
}
