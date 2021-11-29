const { MessageProviderPact } = require('@pact-foundation/pact')
const createMessage = require('../../app/messaging/create-message')

describe('Pact Verification', () => {
  test('eligibility satisfies all responses', async () => {
    const eligibility = {
      callerId: '5089433',
      crn: '1234567890'
    }

    const provider = new MessageProviderPact({
      messageProviders: {
        'a request for new eligibility check': () => createMessage(eligibility).body
      },
      provider: 'ffc-sfi-apply-web',
      consumerVersionTags: ['main', 'dev', 'test', 'preprod', 'prod'],
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
      pactBrokerPassword: process.env.PACT_BROKER_PASSWORD
    })

    return provider.verify()
  })
})
