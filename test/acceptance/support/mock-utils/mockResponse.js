import mockResponseMessage from './mockResponseMessage'
import subscriptionConfig from './mqConfig'

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
    body: { eligibility: [{ sbi: 107700399, name: 'Test user', organisationId: 5426800, address: 'A farm, Somewhere near, Somewhere far, AB12 3CD' }] },
    source: 'ffc-sfi-agreement-calculator',
    type: 'uk.gov.sfi.agreement.eligibility.request.response'
  }
  await mockResponseMessage(baseResponseMessage, process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS, eligibilitySubscription)
}

/**
 * Mock async request/response.
 *
 * @param  {string}  responseType  The type of response to mock
 */
export default async responseType => {
  // TODO: Check this is running in the PR environment. If not, no need to run
  // it. Potentially the check could be done within one of the hooks, setting a
  // flag to be referenced in steps.
  console.log('mocking responseType', responseType)

  switch (responseType) {
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
}
