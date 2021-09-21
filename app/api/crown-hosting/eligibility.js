const { get } = require('./base')

const getEligibilityCheck = async (organisationId, callerId) => {
  const url = `/SitiAgriApi/authorisation/organisation/${organisationId}/byFunction?functions=submitELMApplications&module=CUST_SS_PORTAL`
  const response = await get(url, callerId)

  return response?.payload?.data?.submitELMApplications
}

module.exports = getEligibilityCheck
