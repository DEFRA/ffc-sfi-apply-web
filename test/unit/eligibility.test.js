const cache = require('../../app/cache')

const callerId = 123456
const crn = 1234567890
const organisationId = 1234567
const name = 'Title Forename Lastname'
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

  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../app/server')
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    await cache.update('apply-journey', request.yar.id, { crn, callerId })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await cache.clear('apply-journey', request.yar.id)
    await server.stop()
  })

  test('completes valid message for both send and receiv', async () => {
    await getEligibility(request)
    expect(mockSendMessage).toHaveBeenCalled()
    expect(mockReceiveMessage).toHaveBeenCalled()
  })
})
