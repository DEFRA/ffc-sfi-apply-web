// const { sequelize } = require('../data')

async function getProgress (progressId) {
  // return sequelize.models.progress.findOne({
  //   raw: true,
  //   where: { progressId }
  // })
}

async function saveProgress (progress) {
  // const progressId = progress.progressId
  // return sequelize.transaction(async (transaction) => {
  //   const existingProgress = await sequelize.models.progress.findOne({ where: { progressId } }, { transaction })
  //   if (!existingProgress) {
  //     const id = await sequelize.models.progress.create({ progress: progress.progress }, { transaction })
  //     console.info(`Created progress: ${progressId}`)
  //     return id.progressId
  //   } else {
  //     await sequelize.models.progress.update({ progress: progress.progress }, { where: { progressId }, transaction: transaction })
  //     console.info(`Updated progress: ${progressId}`)
  //     return progressId
  //   }
  // })
}

module.exports = {
  getProgress,
  saveProgress
}
