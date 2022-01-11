const completeSection = require('./complete-section')
const { NOT_STARTED_YET, COMPLETED } = require('./statuses')

const updateActions = (sections, actionSections, funding, action) => {
  const { actionSection, arableSoilSection, improvedGrasslandSection, moorlandSection } = actionSections
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

module.exports = updateActions
