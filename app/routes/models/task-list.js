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

  const landSection = sections.find(x => x.name === 'Your land')
  const landCoverTask = landSection.tasks.find(x => x.name === 'Confirm your land cover details')
  const fundingSection = sections.find(x => x.name === 'Choose your funding')
  const fundingTask = fundingSection.tasks.find(x => x.name === 'Choose funding option')

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
  // funding selected, need to hide placeholder actions and determine which actions to show
  const actionSection = sections.find(x => x.name === 'Choose your actions')
  const arableSoilSection = sections.find(x => x.name === 'Arable and horticultural soil actions')
  const improvedGrasslandSection = sections.find(x => x.name === 'Improved grassland soil actions')
  const moorlandSection = sections.find(x => x.name === 'Moorlands and rough grazing actions')

  actionSection.active = false
  fundingTask.status = COMPLETED
  fundingSection.completed = true

  if (funding.includes('sfi-arable-soil')) {
    arableSoilSection.active = true
    const arableSoilActionTask = arableSoilSection.tasks.find(x => x.name === 'Arable and horticultural soil actions')
    const arableSoilParcelTask = arableSoilSection.tasks.find(x => x.name === 'Select arable and horticultural soil land parcels')
    const arableSoilOptionalTask = arableSoilSection.tasks.find(x => x.name === 'Optional arable and horticultural soil actions')

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
    const improvedGrasslandActionTask = improvedGrasslandSection.tasks.find(x => x.name === 'Improved grassland soil actions')
    const improvedGrasslandParcelTask = improvedGrasslandSection.tasks.find(x => x.name === 'Select improved grassland soil parcels')
    const improvedGrasslandOptionalTask = improvedGrasslandSection.tasks.find(x => x.name === 'Optional improved grassland soil actions')

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
    const moorlandActionTask = moorlandSection.tasks.find(x => x.name === 'Moorlands and rough grazing actions')

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

  const checkSection = sections.find(x => x.name === 'Check your answers')

  // if all actions complete then update status
  if (!actionSection.active &&
        (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
        (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed) &&
        (!funding.includes('sfi-moorland') || moorlandSection.completed)) {
    const checkTask = checkSection.tasks.find(x => x.name === 'Check your answers')

    // if answers not confirmed then update status
    if (!confirmed) {
      checkTask.status = NOT_STARTED_YET
      return sections
    }

    checkSection.completed = true
    checkTask.status = COMPLETED

    const submitSection = sections.find(x => x.name === 'Submit your application')
    const submitTask = submitSection.tasks.find(x => x.name === 'Submit your application')
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

module.exports = ViewModel
