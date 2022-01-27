
const eligibleSingleOrg = {
  auth:{
    crn: 9867012345,
    callerId: 5100150,
    passwordValue: 'tyyteryyeru',
    multiOrg: false
  },
  landCoverDetails:{
    managementControl: true,
    informationCorrect: true
  },
  fundingOptions: {
    'sfi-arable-soil': true,
    'sfi-improved-grassland': true,
    'sfi-moorland': false
  },
  soilActions: {
    testOrganicMatter: true,
    addOrganicMatter: true,
    producePlan: true,
    greenCover: true,
  },
  registeredInEngland: true,
  bpsEligible: true

}

const eligibleMultipleOrg = {
  auth:{
    crn: 9867012345,
    callerId: 5316557,
    passwordValue: 'tyyteryyeru',
    multiOrg: true
  },
  landCoverDetails:{
    managementControl: true,
    informationCorrect: true
  },
  fundingOptions: {
    'sfi-arable-soil': true,
    'sfi-improved-grassland': true,
    'sfi-moorland': false
  },
  soilActions: {
    testOrganicMatter: true,
    addOrganicMatter: true,
    producePlan: true,
    greenCover: true,
  },
  registeredInEngland: true,
  bpsEligible: true

}
export { eligibleSingleOrg, eligibleMultipleOrg }