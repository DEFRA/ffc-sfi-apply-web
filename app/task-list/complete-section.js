const { COMPLETED } = require('./statuses')

const completeSection = (section) => {
  section.completed = true
  section.tasks.forEach((task) => { task.status = COMPLETED })
}

module.exports = completeSection
