const applyJourneyConfig = require('../../config/apply-journey')
const paymentLevels = require('../payment-levels')
const enrichTask = require('../models/enrich-apply-journey-task')

const applyJourneyTaskList = (applyJourney, progress) => {
  const fundingOption = applyJourney?.selectedStandard?.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
  const paymentLevel = paymentLevels.find(x => x.name === applyJourney?.selectedAmbitionLevel?.name)
  return validateSchema(progress, fundingOption, paymentLevel?.paymentLevel)
}

const validateSchema = (progress, fundingOption, paymentLevel) => {
  const taskListData = JSON.parse(JSON.stringify(groupByTask()))
  const applyProgress = progress?.applyProgress
  if (applyProgress) {
    for (const taskItem of Object.values(taskListData).flat()) {
      setStatus(taskItem, applyProgress)
      enrichTask(taskItem, fundingOption, paymentLevel)
    }
  }
  return taskListData
}

const setStatus = (taskItem, applyProgress) => {
  const dependsOn = taskItem?.taskList?.dependsOn
  if (dependsOn && applyProgress.find(x => x.key === dependsOn)) {
    taskItem.taskList.status = 'NOT STARTED'
  }

  if (applyProgress.find(x => x.key === taskItem.key)) {
    taskItem.taskList.status = 'COMPLETED'
  }
}

const groupByTask = () => {
  const taskList = applyJourneyConfig.filter(a => Boolean(a.taskList.group))

  return taskList.reduce((r, a) => {
    r[a.taskList.group] = [...r[a.taskList.group] || [], a]
    return r
  }, {})
}

module.exports = applyJourneyTaskList
