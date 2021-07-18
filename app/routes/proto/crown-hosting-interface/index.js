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

  const sbis = response?.payload?._data?.map(organisation => ({
    sbi: organisation.sbi,
    organisationId: organisation.id
  }))

  return sbis ?? null
}

async function getOrgDetails (callerId, orgId) {
  const endpoint = `organisation/${orgId}`
  const response = await callCrownHosting(endpoint, callerId)

  return response?.payload?._data
    ? {
      name: response.payload._data?.name,
      address: response.payload._data?.address?.address1,
      postcode: response.payload._data?.address?.postalCode
    }
    : null
}

async function checkEligibilityNewSitiAPI (callerId, sbi) {
  const endpoint = `api/v1/sfi/eligibility/${sbi}`
  const response = await callCrownHosting(endpoint, callerId)

  return response?.payload?.elibigible === 'true'
}

async function checkEligibilityOldSitiAPI (callerId, orgId) {
  const endpoint = `SitiAgriApi/authorisation/organisation/${orgId}/byFunction?functions=submitELMApplications&module=CUST_SS_PORTAL`
  const response = await callCrownHosting(endpoint, callerId)

  return response?.payload?.data?.submitELMApplications
}

module.exports = {
  getSBIs,
  getOrgDetails,
  checkEligibilityNewSitiAPI,
  checkEligibilityOldSitiAPI
}
