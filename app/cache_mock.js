module.exports = [{
  crn: 1101001509,
  callerId: 5100150,
  navigation: {
    previous: 'task-list'
  },
  agreement: {
    agreementNumber: 'AG12345678',
    organisation: {
      sbi: 107700399,
      name: 'A Farmer',
      organisationId: 5426800,
      address: 'A Farm'
    },
    land: {
      isLandCorrect: true,
      hasManagementControl: true
    },
    funding: [],
    action: {},
    confirmed: false,
    submitted: false
  },
  data: {
    eligibleOrganisations: [
      {
        sbi: 123456789,
        name: 'A Farmer',
        organisationId: 1234567,
        address: 'A Farm'
      }
    ],
    land: {
      filename: '1234567.json'
    },
    eligibleStandards: [
      {
        code: 'sfi-arable-soil',
        name: 'Arable and horticultural Soils',
        landCovers: [
          {
            parcelId: 'AB12345678',
            code: '110',
            area: 20.56
          },
          {
            parcelId: 'AB987654321',
            code: '110',
            area: 20.56
          }
        ]
      },
      {
        code: 'sfi-improved-grassland',
        name: 'Improved Grassland',
        landCovers: [
          {
            parcelId: 'AB12345678',
            code: '130',
            area: 20.56
          },
          {
            parcelId: 'AB987654321',
            code: '130',
            area: 20.56
          }
        ]
      },
      {
        code: 'sfi-moorland',
        name: 'Moorland and rough grazing'
      }
    ],
    eligibleStandardsSpatial: {
      'sfi-arable-soil': {
        filename: '1234567-sfi-arable-soil.json'
      },
      'sfi-improved-grassland': {
        filename: '1234567-sfi-improved-grassland.json'
      }
    }
  }
}]
