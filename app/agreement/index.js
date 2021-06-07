const db = require('../data')

async function getAgreements () {
  return db.sequelize.models.agreement.findAll()
}

async function getAgreement (agreementId) {
  return db.sequelize.models.agreement.findOne({
    raw: true,
    where: { agreementId }
  })
}

async function saveAgreement (agreement, progressId) {
  await db.sequelize.transaction(async (transaction) => {
    const existingAgreement = await db.sequelize.models.agreement.findOne({ where: { sbi: agreement.sbi } }, { transaction })
    if (!existingAgreement) {
      await db.sequelize.models.agreement.create({ sbi: agreement.sbi, agreementData: agreement, progressId }, { transaction })
      console.info(`Saved agreement: ${agreement.sbi}`)
    } else {
      await db.sequelize.models.agreement.update({ agreementData: agreement, progressId, statusId: agreement.statusId }, { where: { sbi: agreement.sbi }, transaction: transaction })
      console.info(`Updated agreement: ${agreement.sbi}`)
    }
  })
}

module.exports = {
  getAgreements,
  getAgreement,
  saveAgreement
}
