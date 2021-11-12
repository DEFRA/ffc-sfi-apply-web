const taskList = require('../../task-list')

function ViewModel (progressCache, fundingOption, paymentLevel, savedAgreements, selectedOrganisation) {
  this.model = {
    taskList: validateSchema(progressCache, fundingOption, paymentLevel),
    completedSections: completedSections(progressCache),
    savedAgreements,
    selectedOrganisation
  }
}

const checkTasksInProgressAndRoute = (progress, taskGroup, fundingOption, paymentLevel) => {
  taskGroup.tasks.map(task => {
    task.url = task.url
      .replace(/#paymentLevel#/g, paymentLevel)
      .replace(/#fundingOption#/g, fundingOption)
    if (progress[task.id]) {
      task.status = 'IN PROGRESS'
    }

    return task
  })
}

const validateSchema = (progress, fundingOption, paymentLevel) => {
  const taskListData = JSON.parse(JSON.stringify(taskList))
  if (progress) {
    return taskListData.map((taskGroup) => {
      progress[taskGroup.dependsOn] && updateStatus(progress, taskGroup, 'NOT STARTED')
      checkTasksInProgressAndRoute(progress, taskGroup, fundingOption, paymentLevel)
      progress[taskGroup.id] && updateStatus(progress, taskGroup, 'COMPLETED')
      return taskGroup
    })
  }

  return taskListData
}

const updateStatus = (progressCache, taskGroup, status) => {
  taskGroup.tasks.map(task => {
    const dependsOn = progressCache[task.dependsOn]
    if (dependsOn) {
      task.status = dependsOn[task.id] ? 'COMPLETED' : status
    } else {
      task.status = status
    }

    return task
  })
}

const completedSections = (progressCache) => {
  return progressCache
    ? Object.values(progressCache).filter(complete => complete === true).length
    : 0
}

module.exports = ViewModel
