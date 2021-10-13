describe('which-business route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/eligibility')
  const getEligibility = require('../../../../app/eligibility')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')

  let createServer
  let server
  const organisations = [{
    sbi: 123456789,
    name: 'Title Forename Lastname1',
    organisationId: 1234567,
    address: 'address1, address2, address3, postalCode'
  },
  {
    sbi: 987654321,
    name: 'Title Forename Lastname2',
    organisationId: 7654321,
    address: 'address1, address2, address3, postalCode'
  }]

  beforeEach(async () => {
    getEligibility.mockResolvedValue(
      {
        eligibility: organisations,
        applyJourney: {
          selectedOrganisation: organisations[0]
        }
      }
    )

    mockCache.get.mockResolvedValue({
      eligibleOrganisations: organisations
    })

    createServer = require('../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /which-business returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/which-business'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /which-business returns which-business view', async () => {
    const options = {
      method: 'GET',
      url: '/which-business'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('which-business')
  })

  test('POST /which-business returns 300', async () => {
    const options = {
      method: 'POST',
      url: '/which-business',
      payload: { sbi: '123456789' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /which-business sbi not found in cach', async () => {
    const options = {
      method: 'POST',
      url: '/which-business',
      payload: { sbi: '213456789' }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('which-business')
  })

  test('POST /which-business sbi is not string returns view', async () => {
    const options = {
      method: 'POST',
      url: '/which-business',
      payload: { sbi: 123456789 }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('which-business')
  })
})
