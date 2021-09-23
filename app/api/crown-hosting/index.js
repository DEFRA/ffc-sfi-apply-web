const { getOrganisation, getOrganisations } = require('./organisation')
const getEligibilityCheck = require('./eligibility.js')
const { getLandCover } = require('./land-cover.js')

module.exports = {
  getOrganisation,
  getOrganisations,
  getEligibilityCheck,
  getLandCover
}
