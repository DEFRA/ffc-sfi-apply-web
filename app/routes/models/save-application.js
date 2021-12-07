const cache = require('../../cache')
const { saveAgreement: save } = require('../../api/agreement')

const saveAgreement = async (request) => {
  const agreement = await cache.get(request)
  const { agreementNumber, progressId } = await save(agreement.application, agreement.progress)
  await cache.update(request,
    {
      application: { agreementNumber },
      progress: { progressId }
    })
  return { agreementNumber, progressId }
}

module.exports = saveAgreement
