
const eligibleSingleOrg = {
  auth:{
    crn: 9867012345,
    callerId: 5100150,
    passwordValue: 'tyyteryyeru'
  },
  landCoverDetails:{
    managementControl: true,
    informationCorrect: true
  },
  fundingOptions: {
    arableSoil: true,
    improvedGrassland: true,
    moorland: false
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
    passwordValue: 'tyyteryyeru'
  },
  landCoverDetails:{
    managementControl: true,
    informationCorrect: true
  },
  fundingOptions: {
    arableSoil: true,
    improvedGrassland: false,
    moorland: false
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