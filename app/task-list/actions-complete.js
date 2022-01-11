const actionsComplete = (sections, actionSections, funding) => {
  const { actionSection, arableSoilSection, improvedGrasslandSection, moorlandSection } = actionSections
  return !actionSection.active &&
    (!funding.includes('sfi-arable-soil') || arableSoilSection.completed) &&
    (!funding.includes('sfi-improved-grassland') || improvedGrasslandSection.completed) &&
    (!funding.includes('sfi-moorland') || moorlandSection.completed)
}

module.exports = actionsComplete
