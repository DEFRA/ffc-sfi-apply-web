const taskList = require('../task-list')
const ViewModel = require('./models/application-task-list')
const cache = require('../cache')

const validateSchema = (progress) => {
  return taskList.map((taskGroup) => {
    progress[taskGroup.dependsOn] && updateStatus(taskGroup, 'NOT STARTED')
    progress[taskGroup.id] && updateStatus(taskGroup, 'COMPLETED')
    return taskGroup
  })
}

const updateStatus = (taskGroup, status) => {
  taskGroup.tasks.map(task => { task.status = status })
}

const completedSections = (progress) => {
  return progress ? Object.values(progress).filter((complete) => complete).length : 0
}

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: async (request, h) => {
      const progress = await cache.get('progress', request.yar.id)
      console.log(completedSections(progress))
      return h.view('application-task-list', new ViewModel(validateSchema(progress), completedSections(progress)))
    }
  }
}
