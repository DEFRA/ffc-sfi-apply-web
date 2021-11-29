const cache = require('../../app/cache')

const callerId = 123456
const crn = 1234567890
const organisationId = 1234567
const name = 'Title Forename LastName'
const sbi = 123456789

const mockSendMessage = jest.fn()
const mockReceiveMessage = jest.fn(() => {
  return [{
    body: {
      eligibility: [{
        sbi,
        name,
        organisationId,
        address: 'address1, address2, address3, postalCode'
      }]
    }
  }]
})
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: mockSendMessage,
        closeConnection: jest.fn()
      }
    }),
    MessageReceiver: jest.fn().mockImplementation(() => {
      return {
        receiveMessages: mockReceiveMessage,
        acceptSession: jest.fn(),
        completeMessage: jest.fn(),
        closeConnection: jest.fn()
      }
    })
  }
})

const getEligibility = require('../../app/eligibility')

describe('process eligibility message', () => {
  const request = {
    yar: {
      id: '1234567890'
    }
  }

  const createServer = require('../../app/server')
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    await cache.update('agreement', request.yar.id, { application: { crn, callerId } })
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  afterAll(async () => {
    await cache.clear('agreement', request.yar.id)
    await server.stop()
  })

  test('completes valid message for both send and receive', async () => {
    await getEligibility(request)
    expect(mockSendMessage).toHaveBeenCalled()
    expect(mockReceiveMessage).toHaveBeenCalled()
  })
})
