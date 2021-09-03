const cache = require('../../../../../cache')
const { sendStandardsRequestMessage } = require('../../../../../messaging')
const getPollingResponse = require('../../../../../polling')
const generateAgreementNumber = require('../../../../../agreement-number')

async function getAllStandards (request, error) {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let standards = null
  if (error && applyJourney.standards) {
    standards = applyJourney.standards
  } else {
    await sendStandardsRequestMessage({ sbi: applyJourney.selectedSbi.sbi, organisationId: applyJourney.selectedSbi.organisationId, callerId: applyJourney.callerId }, request.yar.id)
    const response = await getPollingResponse(request.yar.id, '/standards')
    if (response) {
      console.info('Standards request received', response)
      const agreementNumber = response.agreementNumber ?? generateAgreementNumber()
      await cache.update('apply-journey', request.yar.id, { agreementNumber: agreementNumber, standards: response.standards })
      standards = response.standards
    } else {
      return null
    }
  }
  return { applyJourney, standards }
}

module.exports = getAllStandards
