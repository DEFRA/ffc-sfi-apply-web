const generateNumber = require('./generate-number')

// Undefined values added to make intended structure clear
// TODO: set values back to 0 once calculation added
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
        paymentAmount: 100
      },
      'sfi-improved-grassland': {
        active: false,
        canTestOrganicMatter: undefined,
        canAssessSoil: undefined,
        canProducePlan: undefined,
        canHaveGreenCover: undefined,
        canEstablishHerbalLeys: undefined,
        landCovers: [],
        paymentAmount: 100
      },
      'sfi-moorland': {
        active: false,
        paymentAmount: 100
      },
      paymentAmount: 300
    }
  }
}

module.exports = create
