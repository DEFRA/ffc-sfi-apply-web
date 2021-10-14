const mockSendMessage = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: mockSendMessage,
        closeConnection: jest.fn()
      }
    })
  }
})
jest.mock('../../app/eligibility')
const path = require('path')
const { MessageConsumerPact } = require('@pact-foundation/pact')
const Matchers = require('@pact-foundation/pact/src/dsl/matchers')
const cache = require('../../app/cache')

describe('receiving an eligibility check from SFI application', () => {
  let consumer
  let receiver

  beforeAll(async () => {
    await cache.start()
    consumer = new MessageConsumerPact({
      provider: 'ffc-sfi-agreement-calculator',
      consumer: 'ffc-sfi-apply-web',
      log: path.resolve(process.cwd(), 'test-output', 'pact.log'),
      dir: path.resolve(process.cwd(), 'test-output')
    })
    receiver = { completeMessage: jest.fn(), abandonMessage: jest.fn() }
  })

  afterAll(async () => {
    await cache.flushAll()
    await cache.stop()
  })

  test('new eligibility check sends response message and sets message complete', async () => {
    await consumer
      .given('message is valid')
      .expectsToReceive('a new eligibility check')
      .withContent([{
        sbi: Matchers.integer(123456789),
        name: Matchers.like('Fred Potter'),
        organisationId: Matchers.like('123456789'),
        address: Matchers.like('address1, address2, address3, postalCode')
      }])
      .withMetadata({
        'content-type': 'application/json',
        'correlation-id': 'f492c3f4-03b3-455b-8de9-b9b05e025434',
        'message-id': '0373821b-dd8c-4c3a-9fd8-f384504aa7bc'
      })
      .verify(async eligibilityMessage => eligibilityMessage.eligibility)
    expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
  })
})
