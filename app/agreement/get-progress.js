const { sequelize } = require('../data')

async function getProgress (progressId) {
  return sequelize.models.progress.findOne({
    raw: true,
    where: { progressId }
  })
}

module.exports = getProgress
