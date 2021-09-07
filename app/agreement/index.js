const { getProgress } = require('../progress')
const cache = require('../cache')
const { getAgreement } = require('../api/agreement')

const saveAgreement = async (agreement, progressId) => {
}

const loadAgreement = async (request) => {
  await cache.clear('agreement', request.yar.id)
  await cache.clear('progress', request.yar.id)

  const agreementId = request.query.agreementId
  const sbi = request.query.sbi
  const agreement = await getAgreement(agreementId, sbi)
  await cache.update('agreement', request.yar.id, agreement.agreementData)

  if (agreement) {
    const progress = await getProgress(agreement.progressId)
    await cache.update('progress', request.yar.id, progress)
  }
}

const deleteAgreement = async (agreement) => {
}

module.exports = {
  saveAgreement,
  loadAgreement,
  deleteAgreement
}
