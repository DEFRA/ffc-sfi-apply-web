const sections = require('./sections')

const NOT_STARTED_YET = 'NOT STARTED YET'
const COMPLETED = 'COMPLETED'

function ViewModel (cachedData) {
  const filteredSections = filterSections(cachedData)
  this.model = {
    backLink: getBackLink(cachedData.previousUrl),
    agreementNumber: cachedData.agreement.agreementNumber,
    sections: filteredSections,
    totalSections: filteredSections.length,
    completedSections: filteredSections.filter(x => x.completed).length
  }
}

const getBackLink = (previousUrl) => {
  return previousUrl ?? '/start-application'
}

const filterSections = (cachedData) => {
  const updatedSections = updateSections(cachedData)
  return updatedSections.filter(x => x.active)
}

const updateSections = (cachedData) => {
  const { land, funding, action, confirmed, submitted } = cachedData

  // land section not started, return initial task list
  if (land.isLandCorrect == null) {
    return sections
  }

  const landSection = sections.find(x => x.name === 'Your land')
  const fundingSection = sections.find(x => x.name === 'Choose your funding')

  // land section complete but funding not set yet
  if (land.isLandCorrect != null && land.hasManagementControl != null && !funding.length) {
    landSection.completed = true
    landSection.tasks.forEach(x => { x.status = COMPLETED })
    fundingSection.status = NOT_STARTED_YET
    fundingSection.tasks[0].status = NOT_STARTED_YET
    return sections
  }

  // funding selected, need to hide placeholder actions and determine which actions to show
  if (funding.length) {
    const actionSection = sections.find(x => x.name === 'Choose your actions')
    const arableSoilSection = sections.find(x => x.name === 'Arable and horticultural soil actions')
    const improvedGrasslandSection = sections.find(x => x.name === 'Improved grassland soil actions')
    const moorlandSection = sections.find(x => x.name === 'Moorlands and rough grazing actions')

    actionSection.active = false

    if (funding.includes('sfi-arable-soil')) {
      arableSoilSection.active = true
      const arableSoilActionTask = arableSoilSection.tasks(x => x.name === 'Arable and horticultural soil actions')
      const arableSoilParcelTask = arableSoilSection.tasks(x => x.name === 'Select arable and horticultural soil land parcels')
      const arableSoilOptionalTask = arableSoilSection.tasks(x => x.name === 'Optional arable and horticultural soil actions')

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
      const improvedGrasslandActionTask = improvedGrasslandSection.tasks(x => x.name === 'Select improved grassland soil actions')
      const improvedGrasslandParcelTask = improvedGrasslandSection.tasks(x => x.name === 'Select improved grassland soil parcels')
      const improvedGrasslandOptionalTask = improvedGrasslandSection.tasks(x => x.name === 'Optional improved grassland soil actions')

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

      if (funding.includes('sfi-moorland')) {
        moorlandSection.active = true
        const moorlandActionTask = moorlandSection.tasks(x => x.name === 'Moorlands and rough grazing actions')

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
        const checkTask = checkSection.find(x => x.name === 'Check your answers')

        // if answers not confirmed then update status
        if (!confirmed) {
          checkTask.status = NOT_STARTED_YET
          return sections
        }

        checkSection.completed = true
        checkTask.status = COMPLETED

        const submittedSection = sections.find(x => x.name === 'Submit your application')
        const submitTask = sections.find(x => x.name === 'Submit your application')
        // if confirmed but not submitted then update status
        if (!submitted) {
          submitTask.status = NOT_STARTED_YET
          return sections
        }

        submittedSection.completed = true
        submitTask.status = COMPLETED
        return sections
      }

      return sections
    }
  }
}

module.exports = ViewModel
