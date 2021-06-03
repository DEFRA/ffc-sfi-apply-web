const taskList = require('../../task-list')

function ViewModel (progressCache) {
  this.model = {
    taskList: validateSchema(progressCache),
    completedSections: completedSections(progressCache)
  }
}

const validateSchema = (progressCache) => {
  return taskList.map((taskGroup) => {
    progressCache[taskGroup.dependsOn] && updateStatus(progressCache, taskGroup, 'NOT STARTED')
    progressCache[taskGroup.id] && updateStatus(progressCache, taskGroup, 'COMPLETED')
    return taskGroup
  })
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
