const { MessageProviderPact } = require('@pact-foundation/pact')
const createMessage = require('../../app/messaging/create-message')

describe('Pact Verification', () => {
  test('validates the expectations of ffc-sfi-agreement-calculator', async () => {
    const eligibility = {
      callerId: '5089433',
      crn: 'Joe Bloggs'
    }

    const provider = new MessageProviderPact({
      messageProviders: {
        'a request for new eligibility': () => createMessage(eligibility).body
      },
      consumer: 'ffc-sfi-agreement-calculator',
      provider: 'ffc-sfi-apply-web',
      consumerVersionTags: ['main', 'dev', 'test', 'preprod', 'prod'],
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
      pactBrokerPassword: process.env.PACT_BROKER_PASSWORD
    })

    return provider.verify()
  })
})
