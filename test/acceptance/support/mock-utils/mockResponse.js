import mockResponseMessage from './mockResponseMessage'
import { subscriptionConfig } from './mqConfig'

const organisationId = 5426800
const standardsBody = require('../data/standards.json')

async function mockWhatFunding () {
  const standardsSubscription = {
    ...subscriptionConfig,
    address: process.env.STANDARDS_SUBSCRIPTION_ADDRESS,
    topic: process.env.STANDARDS_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: standardsBody,
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.standards.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.STANDARDSRESPONSE_QUEUE_ADDRESS, standardsSubscription)
}

async function mockWhatPaymentLevel () {
  const calculateSubscription = {
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
  await mockResponseMessage(baseResponseMessage, process.env.CALCULATERESPONSE_QUEUE_ADDRESS, calculateSubscription)
}

async function mockWhichBusiness () {
  const eligibilitySubscription = {
    ...subscriptionConfig,
    address: process.env.ELIGIBILITY_SUBSCRIPTION_ADDRESS,
    topic: process.env.ELIGIBILITY_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: { eligibility: [{ sbi: 107700399, name: 'Test user', organisationId, address: 'A farm, Somewhere near, Somewhere far, AB12 3CD' }] },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.eligibility.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS, eligibilitySubscription)
}

async function mockConfirmDetails () {
  const parcelSpatialSubscription = {
    ...subscriptionConfig,
    address: process.env.PARCELSPATIAL_SUBSCRIPTION_ADDRESS,
    topic: process.env.PARCELSPATIAL_TOPIC_ADDRESS
  }
  const baseResponseMessage = {
    body: {
      organisationId,
      filename: `${organisationId}.json`,
      storageUrl: `https://ffcland.blob.core.windows.net/parcels-spatial/${organisationId}.json`
    },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.parcel.spatial.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.PARCELSPATIALRESPONSE_QUEUE_ADDRESS, parcelSpatialSubscription)
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
      case 'what-funding':
        await mockWhatFunding()
        break
      case 'what-payment-level':
        await mockWhatPaymentLevel()
        break
      case 'which-business':
        await mockWhichBusiness()
        break
      default:
        console.error('Trying to mock an unmocked action', responseType)
        break
    }
  } else {
    console.log('PR environment not found. Mocking is not active.')
  }
}
