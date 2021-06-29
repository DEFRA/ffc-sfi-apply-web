const buildMessage = (agreement) => {
  return {
    sbi: agreement.sbi,
    agreementNumber: agreement.agreementNumber,
    calculation: {
      standards: {
        soilProtection: {
          actions: {
            cultivateDrillSlope: buildActions('cultivateDrillSlope', agreement),
            stripTillageNoTill: buildActions('stripTillageNoTil', agreement),
            soilManagementPlan: buildActions('soilManagementPlan', agreement),
            avoidMachineryTraffic: buildActions('avoidMachineryTraffic', agreement),
            soilAssessment: buildActions('soilAssessment', agreement),
            useShallow: buildActions('useShallow', agreement),
            addOrganicMatter: buildActions('addOrganicMatter', agreement),
            establishGreenCover: buildPropertyAction('greenCover', agreement),
            convertArableLand: buildPropertyAction('permanentGrass', agreement)
          }
        },
        permanentGrasslandProtection: { actions: [] },
        moorlandGrazing: { actions: [] },
        livestockWelfare: { actions: [] }
      }
    }
  }
}

const buildActions = (action, agreement) => {
  return agreement.primaryActions.includes(action) ? agreement.landInHectares
    .filter(parcel => parcel.value > 0)
    .map(parcel => {
      return {
        parcelId: parcel.name,
        area: parcel.value
      }
    }) : []
}

const buildPropertyAction = (action, agreement) => {
  return action in agreement ? [{
    parcelId: '',
    area: agreement[action]
  }] : []
}

module.exports = buildMessage
