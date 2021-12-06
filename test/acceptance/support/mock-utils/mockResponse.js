import mockResponseMessage from './mockResponseMessage'
import { subscriptionConfig } from './mqConfig'

const organisationId = 5426800
const standardsBody = require('../data/standards.json')

async function mockConfirmDetails () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.PARCELSPATIAL_SUBSCRIPTION_ADDRESS,
    topic: process.env.PARCELSPATIAL_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: {
      organisationId,
      filename: `${organisationId}.json`,
      storageUrl: `https://ffclandmock.blob.core.windows.net/parcels-spatial/${organisationId}.json`
    },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.parcel.spatial.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.PARCELSPATIALRESPONSE_QUEUE_ADDRESS, receiverConfig)
}

async function mockHowMuch () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.PARCELSTANDARD_SUBSCRIPTION_ADDRESS,
    topic: process.env.PARCELSTANDARD_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: {
      organisationId,
      filename: `${organisationId}-sfi-arable-soil-v2.json`,
      storageUrl: `https://ffclandmock.blob.core.windows.net/parcels-standard/${organisationId}-sfi-arable-soil-v2.json`
    },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.parcel.standard.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.PARCELSTANDARDRESPONSE_QUEUE_ADDRESS, receiverConfig)
}

async function mockWhatFunding () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.STANDARDS_SUBSCRIPTION_ADDRESS,
    topic: process.env.STANDARDS_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: standardsBody,
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.standards.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.STANDARDSRESPONSE_QUEUE_ADDRESS, receiverConfig)
}

async function mockWhatPaymentLevel () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.CALCULATE_SUBSCRIPTION_ADDRESS,
    topic: process.env.CALCULATE_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: {
      Introductory: { rate: '26.00', paymentAmount: '81.64' },
      Intermediate: { rate: '41.00', paymentAmount: '128.74' },
      Advanced: { rate: '60.00', paymentAmount: '188.40' }
    },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.calculate.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.CALCULATERESPONSE_QUEUE_ADDRESS, receiverConfig)
}

async function mockWhichBusiness () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.ELIGIBILITY_SUBSCRIPTION_ADDRESS,
    topic: process.env.ELIGIBILITY_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: { eligibility: [ { sbi: 107700399, name: 'Test user', organisationId, address: 'A farm, Somewhere near, Somewhere far, AB12 3CD' } ] },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.eligibility.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS, receiverConfig)
}

async function mockEligibleOrganisations () {
  const receiverConfig = {
    ...subscriptionConfig,
    address: process.env.ELIGIBILITY_SUBSCRIPTION_ADDRESS,
    topic: process.env.ELIGIBILITY_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: { eligibility: [
         { sbi: 107103820, name: 'Farm one', organisationId, address: 'Farm one, the field, long lane, AB12 4EF' },
         { sbi: 106982014, name: 'Farm two', organisationId, address: 'Farm two, paddy field, house martin, AB12 5GH' },
         { sbi: 107365827, name: 'Farm three', organisationId, address: 'Farm three, paddy field, house martin, AB12 5GH' },        
         { sbi: 106899089, name: 'Chris Hall', organisationId, address: 'Farm one, the field, long lane, AB12 4EF' },
         { sbi: 106889602, name: 'Christine Gillott', organisationId, address: 'Farm two, paddy field, house martin, AB12 5GH' },
         { sbi: 200656757, name: 'Donald Crofts', organisationId, address: 'Farm three, paddy field, house martin, AB12 5GH' },           
         { sbi: 107008163, name: 'E THOMPSON & SON', organisationId, address: 'Farm one, the field, long lane, AB12 4EF' },
         { sbi: 122200885, name: 'Edgar Zoo', organisationId, address: 'Farm two, paddy field, house martin, AB12 5GH' },
         { sbi: 107082108, name: 'Mr J G Romeril', organisationId, address: 'Farm three, paddy field, house martin, AB12 5GH' },        
         { sbi: 106940295, name: 'FALLON, S', organisationId, address: 'Farm one, the field, long lane, AB12 4EF' },
         { sbi: 200156320, name: 'FJ & LA Poole and Son', organisationId, address: 'Farm two, paddy field, house martin, AB12 5GH' },
         { sbi: 113377765, name: 'Farm & Woodland Services', organisationId, address: 'Farm three, paddy field, house martin, AB12 5GH' }            
        
        ] },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.eligibility.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS, receiverConfig)
}


/**
 * Mock async request/response.
 *
 * @param  {string}  responseType  The type of response to mock
 */
export default async responseType => {
  // NOTE: PR_BUILD is set within the build pipeline for PR builds
  if (process.env.PR_BUILD) {
    console.log('PR environment found. Mocking is active. Mocking responseType:', responseType)
    switch (responseType) {
      case 'confirm-details':
        await mockConfirmDetails()
        break
      case 'how-much':
        await mockHowMuch()
        break
      case 'what-funding':
        await mockWhatFunding()
        break
      case 'what-payment-level':
        await mockWhatPaymentLevel()
        break
      case 'which-business':
        await mockWhichBusiness()
        break
      case 'eligible-organisations':
        await mockEligibleOrganisations()
        break
      default:
        console.error('Trying to mock an unmocked action', responseType)
        break
    }
  } else {
    console.log('PR environment not found. Mocking is not active.')
  }
}
