const db = require('../data')

async function saveAgreement (agreement) {
  await db.sequelize.transaction(async (transaction) => {
    const existingAgreement = await db.sequelize.models.agreement.findOne({ where: { sbi: agreement.sbi } }, { transaction })
    if (!existingAgreement) {
      await db.sequelize.models.agreement.create({ sbi: agreement.sbi, agreementData: agreement }, { transaction })
      console.info(`Saved agreement: ${agreement.sbi}`)
    } else {
      await db.sequelize.models.agreement.update({ agreementData: agreement }, { where: { sbi: agreement.sbi }, transaction: transaction })
      console.info(`Updated agreement: ${agreement.sbi}`)
    }
  })
}

module.exports = {
  saveAgreement
}
