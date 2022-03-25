const generateNumber = require('./generate-number')
const status = require('./status')

const inProgress = status.find(x => x.name === 'In progress')

// Undefined values added to make intended structure clear
// TODO: set values back to 0 once calculation added
const AGREEMENT = {
  agreementNumber: undefined,
  confirmed: false,
  submitted: false,
  statusId: inProgress.id,
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
      canHaveGreenCover: undefined,
      canAddOrganicMatter: undefined,
      canAssessSoil: undefined,
      canDiversifySpecies: undefined,
      landCovers: [],
      rate: 0,
      paymentAmount: 0
    },
    'sfi-improved-grassland': {
      active: false,
      actionsComplete: false,
      optionalActionsComplete: false,
      canTestOrganicMatter: undefined,
      canProducePlan: undefined,
      canHaveGreenCover: undefined,
      canAssessSoil: undefined,
      canEstablishHerbalLeys: undefined,
      landCovers: [],
      rate: 0,
      paymentAmount: 0
    },
    'sfi-moorland': {
      active: false,
      actionsComplete: false,
      optionalActionsComplete: false,
      rate: 0,
      paymentAmount: 0
    },
    paymentAmount: 300
  }
}

const create = () => {
  const agreement = JSON.parse(JSON.stringify(AGREEMENT))
  agreement.agreementNumber = generateNumber()
  return agreement
}

module.exports = create
