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
  const {
    landSection,
    fundingSection,
    actionSection,
    arableSoilSection,
    improvedGrasslandSection,
    moorlandSection,
    checkSection,
    submitSection
  } = getSections(sections)

  // land section not started, return initial task list
  if (!land.landComplete) {
    return sections
  }

  const landCoverTask = getTask(landSection, 'Confirm your land cover details')
  const fundingTask = getTask(fundingSection, 'Choose funding option')

  // land section complete
  if (land.landComplete) {
    landSection.completed = true
    landCoverTask.status = COMPLETED
  }

  // if funding not started
  if (!funding.length) {
    fundingSection.status = NOT_STARTED_YET
    fundingTask.status = NOT_STARTED_YET
    return sections
  }

  actionSection.active = false
  fundingTask.status = COMPLETED
  fundingSection.completed = true

  if (funding.includes('sfi-arable-soil')) {
    arableSoilSection.active = true
    const arableSoilActionTask = getTask(arableSoilSection, 'Arable and horticultural soil actions')
    const arableSoilParcelTask = getTask(arableSoilSection, 'Select arable and horticultural soil land parcels')
    const arableSoilOptionalTask = getTask(arableSoilSection, 'Optional arable and horticultural soil actions')

    // if mandatory actions complete, update status
    if (action['sfi-arable-soil'].actionsComplete) {
      arableSoilActionTask.status = COMPLETED
      arableSoilParcelTask.status = NOT_STARTED_YET

      // if land parcels selected, update status
      if (action['sfi-arable-soil'].landCovers.length) {
        arableSoilParcelTask.status = COMPLETED
        arableSoilOptionalTask.status = NOT_STARTED_YET
      }

      // if optional actions complete then section complete
      if (action['sfi-arable-soil'].optionalActionsComplete) {
        arableSoilSection.completed = true
        arableSoilOptionalTask.status = COMPLETED
      }
    }
  }

  if (funding.includes('sfi-improved-grassland')) {
    improvedGrasslandSection.active = true
    const improvedGrasslandActionTask = getTask(improvedGrasslandSection, 'Improved grassland soil actions')
    const improvedGrasslandParcelTask = getTask(improvedGrasslandSection, 'Select improved grassland soil parcels')
    const improvedGrasslandOptionalTask = getTask(improvedGrasslandSection, 'Optional improved grassland soil actions')

    // can only start this section if either arable soil not selected or is complete
    if (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) {
      improvedGrasslandSection.tasks[0].status = NOT_STARTED_YET

      // if mandatory actions complete, update status
      if (action['sfi-improved-grassland'].actionsComplete) {
        improvedGrasslandActionTask.status = COMPLETED
        improvedGrasslandParcelTask.status = NOT_STARTED_YET

        // if land parcels selected, update status
        if (action['sfi-improved-grassland'].landCovers.length) {
          improvedGrasslandParcelTask.status = COMPLETED
          improvedGrasslandOptionalTask.status = NOT_STARTED_YET
        }

        // if optional actions complete then section complete
        if (action['sfi-improved-grassland'].optionalActionsComplete) {
          improvedGrasslandSection.completed = true
          improvedGrasslandOptionalTask.status = COMPLETED
        }
      }
    }
  }

  if (funding.includes('sfi-moorland')) {
    moorlandSection.active = true
    const moorlandActionTask = getTask(moorlandSection, 'Moorlands and rough grazing actions')

    // can only start this section if either no other options selected or all are complete
    if ((!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
        (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed)) {
      moorlandSection.tasks[0].status = NOT_STARTED_YET

      if (action['sfi-moorland'].actionsComplete) {
        moorlandSection.completed = true
        moorlandActionTask.status = COMPLETED
      }
    }
  }

  // if all actions complete then update status
  if (!actionSection.active &&
        (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
        (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed) &&
        (!funding.includes('sfi-moorland') || moorlandSection.completed)) {
    const checkTask = getTask(checkSection, 'Check your answers')

    // if answers not confirmed then update status
    if (!confirmed) {
      checkTask.status = NOT_STARTED_YET
      return sections
    }

    checkSection.completed = true
    checkTask.status = COMPLETED

    const submitTask = getTask(submitSection, 'Submit your application')
    // if confirmed but not submitted then update status
    if (!submitted) {
      submitTask.status = NOT_STARTED_YET
      return sections
    }

    submitSection.completed = true
    submitTask.status = COMPLETED
    return sections
  }

  return sections
}

const getSections = (sections) => {
  const landSection = getSection(sections, 'Your land')
  const fundingSection = getSection(sections, 'Choose your funding')
  const actionSection = getSection(sections, 'Choose your actions')
  const arableSoilSection = getSection(sections, 'Arable and horticultural soil actions')
  const improvedGrasslandSection = getSection(sections, 'Improved grassland soil actions')
  const moorlandSection = getSection(sections, 'Moorlands and rough grazing actions')
  const checkSection = getSection(sections, 'Check your answers')
  const submitSection = getSection(sections, 'Submit your application')
  return {
    landSection,
    fundingSection,
    actionSection,
    arableSoilSection,
    improvedGrasslandSection,
    moorlandSection,
    checkSection,
    submitSection
  }
}

const getSection = (sections, name) => {
  return sections.find(x => x.name === name)
}

const getTask = (section, name) => {
  return section.tasks.find(x => x.name === name)
}

module.exports = ViewModel
