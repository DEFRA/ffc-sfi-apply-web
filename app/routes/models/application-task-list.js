const taskList = require('../../task-list')

function ViewModel (progressCache) {
  this.model = {
    taskList: validateSchema(progressCache),
    completedSections: completedSections(progressCache)
  }
}

const validateSchema = (progressCache) => {
  const taskListData = JSON.parse(JSON.stringify(taskList))

  if (progressCache?.progress) {
    const progress = progressCache.progress
    return taskListData.map((taskGroup) => {
      progress[taskGroup.dependsOn] && updateStatus(progress, taskGroup, 'NOT STARTED')
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
  })
}

const completedSections = (progressCache) => {
  return progressCache ? Object.values(progressCache).filter((complete) => {
    if (complete === true) {
      return complete
    }
  }).length : 0
}

module.exports = ViewModel
