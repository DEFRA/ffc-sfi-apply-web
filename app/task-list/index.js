const getBackLink = require('./get-back-link')
const getSections = require('./get-sections')
const getStatus = require('./get-status')

const buildTaskList = (cachedData) => {
  const sections = getSections(cachedData.agreement)

  return {
    backLink: getBackLink(cachedData.previousUrl),
    agreementNumber: cachedData.agreement.agreementNumber,
    status: getStatus(cachedData.agreement.submitted),
    sections,
    totalSections: sections.length,
    completedSections: sections.filter(x => x.completed).length
  }
}

module.exports = buildTaskList
