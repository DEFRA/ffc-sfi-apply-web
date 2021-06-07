const { sequelize } = require('../data')

async function getProgress (progressId) {
  return sequelize.models.progress.findOne({
    raw: true,
    where: { progressId }
  })
}

async function updateProgress (progressId, progressData) {
  return sequelize.models.progress.update({
    progress: progressData
  }, {
    where: { progressId },
    returning: true
  })
}

module.exports = {
  getProgress,
  updateProgress
}
