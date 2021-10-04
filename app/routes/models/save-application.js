const cache = require('../../cache')
const { saveAgreement: save } = require('../../api/agreement')

const saveAgreement = async (request) => {
  const applyJourney = await cache.get('agreement', request.yar.id)
  const progress = await cache.get('progress', request.yar.id)
  const { agreementNumber, progressId } = await save(applyJourney, progress)
  await cache.update('agreement', request.yar.id, { agreementNumber })
  await cache.update('progress', request.yar.id, { progressId })
  return { agreementNumber, progressId }
}

module.exports = saveAgreement
