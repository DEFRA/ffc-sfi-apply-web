const completeSection = require('./complete-section')
const defaultSections = require('./sections')
const updateActions = require('./update-actions')
const { NOT_STARTED_YET } = require('./statuses')
const actionsComplete = require('./actions-complete')

const getSections = (agreement) => {
  const updatedSections = updateSections(agreement)
  return updatedSections.filter(x => x.active)
}

const updateSections = (agreement) => {
  const sections = JSON.parse(JSON.stringify(defaultSections))
  const { land, funding, action, confirmed, submitted } = agreement

  // land section not started, return initial task list
  if (!land.landComplete) {
    return sections
  }

  const landSection = getSection(sections, 'Your land')
  completeSection(landSection)

  // set funding section ready to start
  const fundingSection = getSection(sections, 'Choose your funding')
  fundingSection.tasks[0].status = NOT_STARTED_YET

  // if funding not started
  if (!funding.length) {
    return sections
  }

  completeSection(fundingSection)

  const actionSections = {
    actionSection: getSection(sections, 'Choose your actions'),
    arableSoilSection: getSection(sections, 'Arable and horticultural soil actions'),
    improvedGrasslandSection: getSection(sections, 'Improved grassland soil actions'),
    moorlandSection: getSection(sections, 'Moorlands and rough grazing actions')
  }

  updateActions(sections, actionSections, funding, action)

  if (!actionsComplete(sections, actionSections, funding)) {
    return sections
  }

  const checkSection = getSection(sections, 'Check your answers')
  checkSection.tasks[0].status = NOT_STARTED_YET

  if (!confirmed) {
    return sections
  }

  completeSection(checkSection)
  const submitSection = getSection(sections, 'Submit your application')
  submitSection.tasks[0].status = NOT_STARTED_YET

  // if confirmed but not submitted then update status
  if (!submitted) {
    return sections
  }

  completeSection(submitSection)
  return sections
}

const getSection = (sections, name) => {
  return sections.find(x => x.name === name)
}

module.exports = getSections
