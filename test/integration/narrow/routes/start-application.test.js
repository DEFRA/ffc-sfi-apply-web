const JWT = require('jsonwebtoken')
const config = require('../../../../app/config')

describe('start-application route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/eligibility')
  const getEligibility = require('../../../../app/eligibility')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')

  let createServer
  let server
  let token
  const callerId = 123456789

  const organisations = [{
    sbi: 123456789,
    name: 'Title Forename 6Lastname1',
    organisationId: 123457,
    address: 'address1, address2, address3, postalCode'
  },
  {
    sbi: 987654321,
    name: 'Title Forename Lastname2',
    organisationId: 7654321,
    address: 'address1, address2, address3, postalCode'
  }]

  beforeEach(async () => {
    token = JWT.sign({ callerId }, config.jwtConfig.secret)
    getEligibility.mockResolvedValue(
      {
        eligibility: organisations,
        agreement: {
          selectedOrganisation: organisations[0]
        }
      }
    )

    mockCache.get.mockResolvedValue(
      {
        application: {
          callerId,
          eligibleOrganisations: organisations
        }
      })

    createServer = require('../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /start-application Auth mode "required" token incorrect callerId', async () => {
    token = JWT.sign({ callerId: 9999 }, config.jwtConfig.secret)
    const options = {
      method: 'GET',
      url: '/start-application'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /start-applicationAuth mode "required" token expired', async () => {
    token = JWT.sign({ callerId }, config.jwtConfig.secret, { expiresIn: '1ms' })
    const options = {
      method: 'GET',
      url: 'start-application'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /start-application Auth mode "required" should require header', async () => {
    const options = {
      method: 'GET',
      url: '/start-application'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /start-application Auth mode "required" should fail with invalid token', async () => {
    token = JWT.sign({ callerId }, 'bad secret')
    const options = {
      method: 'GET',
      url: '/start-application',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /start-application returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/start-application',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /start-application returns start-application view', async () => {
    const options = {
      method: 'GET',
      url: '/start-application',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('start-application')
  })

  test('GET /start-application returns no-businesses view when no organisations returned', async () => {
    const options = {
      method: 'GET',
      url: '/start-application',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: [],
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('no-businesses')
  })

  test('GET /start-application returns no-response view when no response received', async () => {
    const options = {
      method: 'GET',
      url: '/start-application',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: undefined,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('no-response')
  })

  test('POST /start-application returns 300', async () => {
    const options = {
      method: 'POST',
      url: '/start-application',
      headers: { authorization: token },
      payload: { sbi: '123456789' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /start-application sbi not found in cache', async () => {
    const options = {
      method: 'POST',
      url: '/start-application',
      headers: { authorization: token },
      payload: { sbi: '213456789' }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('start-application')
  })

  test('POST /start-application sbi is not string returns view', async () => {
    const options = {
      method: 'POST',
      url: '/start-application',
      headers: { authorization: token },
      payload: { sbi: 123456789 }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('start-application')
  })
})
