const applyJourneyConfig = require('../../config/apply-journey')

const applyJourneyTaskList = (progress) => {
  return validateSchema(progress)
}

const validateSchema = (progress) => {
  const taskListData = JSON.parse(JSON.stringify(groupByTask()))
  const applyProgress = progress?.applyProgress
  if (applyProgress) {
    for (const [key, taskItems] of Object.entries(taskListData)) {
      taskItems.filter(x => x.taskList.group === key).map((taskItem) => {
        const dependsOn = taskItem?.taskList?.dependsOn
        if (dependsOn && applyProgress.find(x => x.key === dependsOn)) {
          taskItem.taskList.status = 'NOT STARTED'
        }

        if (applyProgress.find(x => x.key === taskItem.key)) {
          taskItem.taskList.status = 'COMPLETED'
        }
      })
    }
  }

  return taskListData
}

const groupByTask = () => {
  const taskList = applyJourneyConfig.filter(a => Boolean(a.taskList.group))

  return taskList.reduce((r, a) => {
    r[a.taskList.group] = [...r[a.taskList.group] || [], a]
    return r
  }, {})
}

module.exports = applyJourneyTaskList
