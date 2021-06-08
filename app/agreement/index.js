const db = require('../data')
const { getProgress } = require('../progress')
const cache = require('../cache')

async function getAgreements () {
  return db.agreement.findAll()
}

async function getAgreement (agreementId) {
  return db.agreement.findOne({
    raw: true,
    where: { agreementId }
  })
}

async function saveAgreement (agreement, progressId) {
  await db.sequelize.transaction(async (transaction) => {
    const existingAgreement = await db.agreement.findOne({ where: { sbi: agreement.sbi } }, { transaction })
    if (!existingAgreement) {
      await db.agreement.create({ sbi: agreement.sbi, agreementData: agreement, progressId }, { transaction })
      console.info(`Saved agreement: ${agreement.sbi}`)
    } else {
      await db.agreement.update({ agreementData: agreement, progressId, statusId: agreement.statusId ?? 1 }, { where: { sbi: agreement.sbi }, transaction: transaction })
      console.info(`Updated agreement: ${agreement.sbi}`)
    }
  })
}

async function loadAgreement (request) {
  await cache.clear('agreement', request.yar.id)
  await cache.clear('progress', request.yar.id)

  const agreementId = request.query.agreementId
  const agreement = await getAgreement(agreementId)
  await cache.update('agreement', request.yar.id, agreement.agreementData)

  if (agreement) {
    const progress = await getProgress(agreement.progressId)
    await cache.update('progress', request.yar.id, progress)
  }
}

module.exports = {
  getAgreements,
  getAgreement,
  saveAgreement,
  loadAgreement
}
