const generateNumber = require('./generate-number')

// Undefined values added to make intended structure clear
// TODO: set values back to 0 once calculation added
const AGREEMENT = {
  agreementNumber: generateNumber(),
  confirmed: false,
  submitted: false,
  organisation: {},
  land: {
    isLandCorrect: undefined,
    hasManagementControl: undefined,
    landComplete: false
  },
  funding: [],
  action: {
    'sfi-arable-soil': {
      active: false,
      actionsComplete: false,
      optionalActionsComplete: false,
      canTestOrganicMatter: undefined,
      canProducePlan: undefined,
      canAssessSoil: undefined,
      canHaveGreenCover: undefined,
      canAddOrganicMatter: undefined,
      canDiversifySpecies: undefined,
      landCovers: [],
      paymentAmount: 100
    },
    'sfi-improved-grassland': {
      active: false,
      actionsComplete: false,
      optionalActionsComplete: false,
      canTestOrganicMatter: undefined,
      canProducePlan: undefined,
      canAssessSoil: undefined,
      canHaveGreenCover: undefined,
      canEstablishHerbalLeys: undefined,
      landCovers: [],
      paymentAmount: 100
    },
    'sfi-moorland': {
      active: false,
      actionsComplete: false,
      optionalActionsComplete: false,
      paymentAmount: 100
    },
    paymentAmount: 300
  }
}

const create = () => {
  return JSON.parse(JSON.stringify(AGREEMENT))
}

module.exports = create
