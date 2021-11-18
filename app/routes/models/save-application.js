const cache = require('../../cache')
const { saveAgreement: save } = require('../../api/agreement')

const saveAgreement = async (request) => {
  const agreement = await cache.get('agreement', request.yar.id)
  const { agreementNumber, progressId } = await save(agreement.application, agreement.progress)
  await cache.update('agreement', request.yar.id,
    {
      application: { agreementNumber },
      progress: { progressId }
    })
  return { agreementNumber, progressId }
}

module.exports = saveAgreement
