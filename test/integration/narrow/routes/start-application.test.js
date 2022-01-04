describe('start-application route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')

  let createServer
  let server
  let auth
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
    auth = { strategy: 'session', credentials: { name: 'A Farmer' } }

    mockCache.get.mockResolvedValue(
      {
        callerId,
        data: {
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

  test('GET /start-application returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/start-application?sbi=123456789',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /start-application returns start-application view', async () => {
    const options = {
      method: 'GET',
      url: '/start-application?sbi=123456789',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('start-application')
  })

  test('POST /start-application returns 300', async () => {
    const options = {
      method: 'POST',
      url: '/start-application',
      payload: { sbi: '123456789' },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /start-application returns 400 if no SBI supplied', async () => {
    const options = {
      method: 'POST',
      url: '/start-application',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
