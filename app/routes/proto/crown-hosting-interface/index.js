const wreck = require('@hapi/wreck')
const apiGatewayUrl = 'http://ffc-sfi-api-gateway.ffc-sfi-api-gateway-pr6/'

function callCrownHosting (endpoint, callerId) {
  return wreck.get(
    `${apiGatewayUrl}${endpoint}`,
    {
      headers: { callerId },
      json: true
    }
  )
}

async function getSBIs (callerId) {
  const endpoint = `organisation/person/${callerId}/summary?search=`
  const response = await callCrownHosting(endpoint, callerId)

  console.log(response.payload)
}

module.exports = {
  getSBIs
}
