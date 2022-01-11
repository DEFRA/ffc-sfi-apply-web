const buildTaskList = require('../../task-list')

function ViewModel (cachedData) {
  this.model = buildTaskList(cachedData)
}

module.exports = ViewModel
