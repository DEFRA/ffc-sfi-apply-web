const defaultSections = require('./sections')

const NOT_STARTED_YET = 'NOT STARTED YET'
const COMPLETED = 'COMPLETED'

function ViewModel (cachedData) {
  const filteredSections = filterSections(cachedData.agreement)

  this.model = {
    backLink: getBackLink(cachedData.previousUrl),
    agreementNumber: cachedData.agreement.agreementNumber,
    status: getStatus(cachedData.agreement.submitted),
    sections: filteredSections,
    totalSections: filteredSections.length,
    completedSections: filteredSections.filter(x => x.completed).length
  }
}

const getBackLink = (previousUrl) => {
  return previousUrl ?? '/start-application'
}

const getStatus = (submitted) => {
  return submitted ? 'submitted' : 'in progress'
}

const filterSections = (cachedData) => {
  const updatedSections = updateSections(cachedData)
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

  const fundingSection = getSection(sections, 'Choose your funding')
  fundingSection.tasks[0].status = NOT_STARTED_YET

  // if funding not started
  if (!funding.length) {
    return sections
  }

  completeSection(fundingSection)
  updateActionSections(sections, funding, action)

  // if all actions complete then update status
  if (!actionsComplete(sections, funding)) {
    return sections
  }

  const checkSection = getSection(sections, 'Check your answers')
  if (!confirmed) {
    checkSection.tasks[0].status = NOT_STARTED_YET
    return sections
  }

  completeSection(checkSection)

  const submitSection = getSection(sections, 'Submit your application')
  // if confirmed but not submitted then update status
  if (!submitted) {
    submitSection.tasks[0].status = NOT_STARTED_YET
    return sections
  }

  completeSection(submitSection)
  return sections
}

const getSection = (sections, name) => {
  return sections.find(x => x.name === name)
}

const completeSection = (section) => {
  section.completed = true
  section.tasks.forEach((task) => { task.status = COMPLETED })
}

const updateActionSections = (sections, funding, action) => {
  const actionSection = getSection(sections, 'Choose your actions')
  const arableSoilSection = getSection(sections, 'Arable and horticultural soil actions')
  const improvedGrasslandSection = getSection(sections, 'Improved grassland soil actions')
  const moorlandSection = getSection(sections, 'Moorlands and rough grazing actions')

  // remove placeholder action session
  actionSection.active = false
  if (funding.includes('sfi-arable-soil')) {
    updateSoilSection(arableSoilSection, action['sfi-arable-soil'])
  }

  if (funding.includes('sfi-improved-grassland')) {
    const canStart = !funding.includes('sfi-arable-soil') || arableSoilSection.completed
    updateSoilSection(improvedGrasslandSection, action['sfi-improved-grassland'], canStart)
  }

  if (funding.includes('sfi-moorland')) {
    const canStart = (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
      (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed)
    updateMoorlandSection(moorlandSection, action['sfi-moorland'], canStart)
  }
}

const updateSoilSection = (section, action, canStart = true) => {
  section.active = true

  // can only start this section if either arable soil not selected or is complete
  if (canStart) {
    section.tasks[0].status = NOT_STARTED_YET

    // if mandatory actions complete, update status
    if (action.actionsComplete) {
      section.tasks[0].status = COMPLETED
      section.tasks[1].status = NOT_STARTED_YET

      // if land parcels selected, update status
      if (action.landCovers.length) {
        section.tasks[1].status = COMPLETED
        section.tasks[2].status = NOT_STARTED_YET
      }

      // if optional actions complete then section complete
      if (action.optionalActionsComplete) {
        completeSection(section)
      }
    }
  }
}

const updateMoorlandSection = (section, action, canStart) => {
  section.active = true

  // can only start this section if either no other options selected or all are complete
  if (canStart) {
    section.tasks[0].status = NOT_STARTED_YET

    if (action.actionsComplete) {
      completeSection(section)
    }
  }
}

const actionsComplete = (sections, funding) => {
  const actionSection = getSection(sections, 'Choose your actions')
  const arableSoilSection = getSection(sections, 'Arable and horticultural soil actions')
  const improvedGrasslandSection = getSection(sections, 'Improved grassland soil actions')
  const moorlandSection = getSection(sections, 'Moorlands and rough grazing actions')
  return !actionSection.active &&
    (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
    (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed) &&
    (!funding.includes('sfi-moorland') || moorlandSection.completed)
}

module.exports = ViewModel
