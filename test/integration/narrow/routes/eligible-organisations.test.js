describe('eligible-organisations route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/eligibility')
  const getEligibleOrganisations = require('../../../../app/eligibility')
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
    getEligibleOrganisations.mockResolvedValue(organisations)

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

  test('GET /eligible-organisations Auth mode "required" should require header', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /eligible-organisations returns eligible-organisations view', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
  })

  test('GET /eligible-organisations returns no-businesses view when no organisations returned', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      auth
    }

    getEligibleOrganisations.mockResolvedValue(
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

  test('GET /eligible-organisations returns no-response view when no response received', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      auth
    }

    getEligibleOrganisations.mockResolvedValue(undefined)

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('no-response')
  })

  test('POST /eligible-organisations Auth mode "required" should require header', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /eligible-organisations with valid SBI number returns a record with that SBI number', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      payload: { sbi: 987654321 },
      auth
    }

    const expectedOrganisation = {
      sbi: 987654321,
      name: 'Title Forename Lastname2',
      organisationId: 7654321,
      address: 'address1, address2, address3, postalCode'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
    expect(result.request.response.source.context.model.value).toEqual(options.payload.sbi)
    expect(result.request.response.source.context.organisations[0]).toEqual(expectedOrganisation)
  })

  test('POST /eligible-organisations with SBI number shorter than minimum returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      payload: { sbi: 104999999 },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('The SBI is too short.')
  })

  test('POST /eligible-organisations with SBI number greater than maximum returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      payload: { sbi: 1000000000 },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('The SBI is too long.')
  })

  test('POST /eligible-organisations with SBI number containing letters returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      payload: { sbi: '123abc456' },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('The SBI must be a number.')
  })

  test('POST /eligible-organisations with valid SBI number but none available returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      payload: { sbi: 105000001 },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('No organisation matching SBI.')
  })
})
