const applyJourneyConfig = require('../../config/apply-journey')
const paymentLevels = require('../payment-levels')

const applyJourneyTaskList = (applyJourney, progress) => {
  const fundingOption = applyJourney?.selectedStandard?.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
  const paymentLevel = paymentLevels.find(x => x.name === applyJourney?.selectedAmbitionLevel?.name)
  return validateSchema(progress, fundingOption, paymentLevel?.paymentLevel)
}
const enrichKey = (taskItem, fundingOption, paymentLevel) => {
  const taskKeys = ['key', 'route', 'next', 'back']
  for (const key of taskKeys) {
    taskItem[key] = taskItem[key]
      .replace(/#paymentLevel#/g, paymentLevel ?? '')
      .replace(/#fundingOption#/g, fundingOption ?? '')
  }
}

const validateSchema = (progress, fundingOption, paymentLevel) => {
  const taskListData = JSON.parse(JSON.stringify(groupByTask()))
  const applyProgress = progress?.applyProgress
  if (applyProgress) {
    for (const taskItem of Object.values(taskListData).flat()) {
      setStatus(taskItem, applyProgress)
      enrichKey(taskItem, fundingOption, paymentLevel)
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
