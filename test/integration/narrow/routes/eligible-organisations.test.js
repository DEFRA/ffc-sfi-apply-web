const JWT = require('jsonwebtoken')
const config = require('../../../../app/config')

describe('eligible-organisations route', () => {
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

  test('GET /eligible-organisations Auth mode "required" token incorrect callerId', async () => {
    token = JWT.sign({ callerId: 9999 }, config.jwtConfig.secret)
    const options = {
      method: 'GET',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /eligible-organisations Auth mode "required" token expired', async () => {
    token = JWT.sign({ callerId }, config.jwtConfig.secret, { expiresIn: '1ms' })
    const options = {
      method: 'GET',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /eligible-organisations Auth mode "required" should require header', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /eligible-organisations Auth mode "required" should fail with invalid token', async () => {
    token = JWT.sign({ callerId }, 'bad secret')
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /eligible-organisations returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /eligible-organisations returns eligible-organisations view', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
  })

  test('GET /eligible-organisations returns no-businesses view when no organisations returned', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
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
      url: '/eligible-organisations',
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

  // test that the request object contains the field for the SBI number, i.e. request.payload.sbi?


  test('POST /eligible-organisations with valid SBI number returns a table', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 987654321 }
    }

    const result = await server.inject(options)

    expect(result has 1 table)
  })

  test('POST /eligible-organisations with valid SBI number returns a table with 1 row', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 987654321 }
    }

    const result = await server.inject(options)

    expect(result has 1 table with 1 row)
  })

  test('POST /eligible-organisations with valid SBI number returns a record with that SBI number', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 987654321 }
    }

    const result = await server.inject(options)

    expect(result has 1 table with 1 row and that rows SBI number is the SBI from payload)
  })

  // what does this actual return? -- is this useful to negate for happy path, i.e. valid = no error bar
  test('POST /eligible-organisations with invalid SBI number returns an error bar', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 0000001 }
    }

    const result = await server.inject(options)

    expect(result has an error bar appear)
  })

  // what is returned for an invalid SBI, is it just error message, error message with the table intact, error message with the table emptied?
  test('POST /eligible-organisations with invalid SBI number returns an empty table', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 0000001 }
    }

    const result = await server.inject(options)

    expect(result has an error bar appear)
  })


})
