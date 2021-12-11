const generateNumber = require('./generate-number')

const create = () => {
  return {
    agreementNumber: generateNumber(),
    confirmed: false,
    submitted: false,
    organisation: {},
    land: {
      isLandCorrect: undefined,
      hasManagementControl: undefined
    },
    funding: [],
    action: {
      'sfi-arable-soil': {
        active: false,
        canTestOrganicMatter: undefined,
        canAssessSoil: undefined,
        canProducePlan: undefined,
        canHaveGreenCover: undefined,
        canAddOrganicMatter: undefined,
        canDiversifySpecies: undefined,
        landCovers: [],
        paymentAmount: 0
      },
      'sfi-improved-grassland': {
        active: false,
        canTestOrganicMatter: undefined,
        canAssessSoil: undefined,
        canProducePlan: undefined,
        canHaveGreenCover: undefined,
        canEstablishHerbalLeys: undefined,
        landCovers: [],
        paymentAmount: 0
      },
      'sfi-moorland': {
        active: false,
        paymentAmount: 0
      },
      paymentAmount: 0
    }
  }
}

module.exports = create
