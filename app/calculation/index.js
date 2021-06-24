const buildMessage = (agreement) => {
  const message = {
    sbi: agreement.sbi,
    agreementNumber: agreement.agreementNumber,
    calculation: {
      standards: []
    }
  }

  message.calculation.standards.push(buildSoilProtectionStandards(agreement))
  message.calculation.standards.push(buildStandard('permanentGrasslandProtection'))
  message.calculation.standards.push(buildStandard('moorlandGrazing'))
  message.calculation.standards.push(buildStandard('livestockWelfare'))

  return message
}

const buildSoilProtectionStandards = (agreement) => {
  const soilProtectionStandards = buildStandard('soilProtection')

  soilProtectionStandards.soilProtection.actions = agreement.primaryActions.map(action => {
    return buildAction(action, agreement)
  })

  agreement.greenCover && soilProtectionStandards.soilProtection.actions.push(buildAction('greenCover', agreement))
  agreement.permanentGrass && soilProtectionStandards.soilProtection.actions.push(buildAction('permanentGrass', agreement))

  return soilProtectionStandards
}

const buildStandard = (standard) => {
  return {
    [standard]: {
      actions: []
    }
  }
}

const buildAction = (action, agreement) => {
  return {
    [action]: {
      parcelId: agreement.landInHectares
        .filter(parcel => parcel.value > 0)
        .map(parcel => parcel.name),
      area: agreement.landInHectares.reduce((x, y) => x + y.value, 0)
    }
  }
}

module.exports = buildMessage
