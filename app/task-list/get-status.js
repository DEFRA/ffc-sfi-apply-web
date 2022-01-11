const getStatus = (submitted) => {
  return submitted ? 'submitted' : 'in progress'
}

module.exports = getStatus
