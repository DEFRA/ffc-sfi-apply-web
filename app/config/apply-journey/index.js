const core = require('./data/core.json')
const landBusinessDetails = require('./data/land-business-details.json')
const fundingOptions = require('./data/funding-options.json')
const landManagement = require('./data/land-management.json')
const landManagementImprovedGrassland = require('./data/land-management-improved-grassland')
const landManagementArableSoils = require('./data/land-management-arable-soils')
const submitAgreement = require('./data/submit-agreement.json')

const applyJourneyConfig = [].concat(
  core, landBusinessDetails, fundingOptions,
  landManagement, submitAgreement,
  landManagementImprovedGrassland,
  landManagementArableSoils)

module.exports = applyJourneyConfig
