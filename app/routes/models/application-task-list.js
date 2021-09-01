const taskList = require('../../task-list')

function ViewModel (progressCache) {
  this.model = {
    taskList: validateSchema(progressCache),
    completedSections: completedSections(progressCache)
  }
}

const checkInprogress = (progress, taskGroup) => {
  taskGroup.tasks.map(task => {
    if (progress[task.id]) {
      task.status = 'IN PROGRESS'
    }
  })
}

const validateSchema = (progressCache) => {
  const taskListData = JSON.parse(JSON.stringify(taskList))

  if (progressCache?.progress) {
    const progress = progressCache.progress
    console.log('progress', progress)
    return taskListData.map((taskGroup) => {
      console.log(progress[taskGroup.id], taskGroup)
      progress[taskGroup.dependsOn] && updateStatus(progress, taskGroup, 'NOT STARTED')
      checkInprogress(progress, taskGroup)
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
