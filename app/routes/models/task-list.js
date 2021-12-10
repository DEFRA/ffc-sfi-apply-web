const tasks = require('./tasks')

function ViewModel (progress) {
  this.model = {
    taskList: validateSchema(progress),
    completedSections: 0
  }
}

const checkTasksInProgressAndRoute = (progress, taskGroup) => {
  taskGroup.tasks.map(task => {
    if (progress[task.id]) {
      task.status = 'IN PROGRESS'
    }
    return task
  })
}

const validateSchema = (progress) => {
  const taskListData = JSON.parse(JSON.stringify(tasks))
  if (progress) {
    return taskListData.map((taskGroup) => {
      progress[taskGroup.dependsOn] && updateStatus(progress, taskGroup, 'NOT STARTED')
      checkTasksInProgressAndRoute(progress, taskGroup)
      progress[taskGroup.id] && updateStatus(progress, taskGroup, 'COMPLETED')
      return taskGroup
    })
  }

  return taskListData
}

const updateStatus = (progress, taskGroup, status) => {
  taskGroup.tasks.map(task => {
    const dependsOn = progress[task.dependsOn]
    if (dependsOn) {
      task.status = dependsOn[task.id] ? 'COMPLETED' : status
    } else {
      task.status = status
    }

    return task
  })
}

module.exports = ViewModel
