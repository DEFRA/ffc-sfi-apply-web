const { getProgress } = require('../progress')
const cache = require('../cache')
const { getAgreement } = require('../api/agreement')

async function saveAgreement (agreement, progressId) {
  // await db.sequelize.transaction(async (transaction) => {
  //   const existingAgreement = await db.agreement.findOne({ where: { sbi: agreement.sbi } }, { transaction })
  //   if (!existingAgreement) {
  //     await db.agreement.create({ sbi: agreement.sbi, agreementData: agreement, progressId }, { transaction })
  //     console.info(`Saved agreement: ${agreement.sbi}`)
  //   } else {
  //     await db.agreement.update({ agreementData: agreement, progressId, statusId: agreement.statusId ?? 1 }, { where: { sbi: agreement.sbi }, transaction: transaction })
  //     console.info(`Updated agreement: ${agreement.sbi}`)
  //   }
  // })
}

async function loadAgreement (request) {
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

async function deleteAgreement (agreement) {
  // await db.agreement.update({ statusId: 4 }, { where: { sbi: agreement.sbi } })
}

module.exports = {
  saveAgreement,
  loadAgreement,
  deleteAgreement
}
