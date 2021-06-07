const { sequelize } = require('../data')

async function getAgreements () {
  return sequelize.models.agreement.findAll()
}

async function getAgreement (agreementId) {
  return sequelize.models.agreement.findOne({
    raw: true,
    where: { agreementId }
  })
}

module.exports = {
  getAgreements,
  getAgreement
}
