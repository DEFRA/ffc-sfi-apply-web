const JWT = require('jsonwebtoken')
const config = require('../../../../app/config')

describe('eligible-organisations route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/eligibility')
  jest.mock('../../../../app/cache')

  const getEligibility = require('../../../../app/eligibility')
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

  const organisationsLarge = []

  for (let index = 1; index < 77; index++) {
    const organisation = {
      sbi: 987654321 - index,
      name: `Test name ${index}`,
      organisationId: 7654321 - index,
      address: `Test address ${index}`
    }

    organisationsLarge.push(organisation)
  }

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
      url: '/eligible-organisations?page=4',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /eligible-organisations with no page query returns page defaults to 1', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.query.page).toBe(1)
  })

  test('GET /eligible-organisations with page query returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=4',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
  })

  test('GET /eligible-organisations with page query returns eligible-organisations view', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=4',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

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

  test('GET /eligible-organisations returns no-response view when no response received', async () => {
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

  test('GET /eligible-organisations with over 10 organisations returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /eligible-organisations with over 10 organisations returns pagination flag as true', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.pagination).toBe(true)
  })

  test('GET /eligible-organisations with over 10 organisations returns eligible-organisations view', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
  })

  test('GET /eligible-organisations with over 10 organisations and no page query returns page defaults to 1', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.query.page).toBe(1)
  })

  test('GET /eligible-organisations with over 10 organisations and page query set to valid value returns eligible-organisations view on that page', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=2',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
    expect(result.request.query.page).toBe(2)
  })

  test('GET /eligible-organisations with over 10 organisations and page query set to exceeding page value returns eligible-organisations view on the last page', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=222',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('eligible-organisations')
    expect(result.request.response.source.context.page).toBe(8)
  })

  test('GET /eligible-organisations with over 10 organisations returns correct pagination meta data', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.total).toBe(76)
    expect(result.request.response.source.context.limit).toBe(10)
  })

  test('GET /eligible-organisations with over 10 organisations on first page returns correct pagination flags', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.page).toBe(1)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.hasNext).toBe(true)
    expect(result.request.response.source.context.hasPrevious).toBe(false)
    expect(result.request.response.source.context.showNextEllipsis).toBe(true)
    expect(result.request.response.source.context.showPreviousEllipsis).toBe(false)
  })

  test('GET /eligible-organisations with over 10 organisations on last page returns correct pagination flags', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=8',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.page).toBe(8)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.hasNext).toBe(false)
    expect(result.request.response.source.context.hasPrevious).toBe(true)
    expect(result.request.response.source.context.showNextEllipsis).toBe(false)
    expect(result.request.response.source.context.showPreviousEllipsis).toBe(true)
  })

  test('GET /eligible-organisations with over 10 organisations on 2nd first page returns correct pagination flags', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=2',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.page).toBe(2)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.hasNext).toBe(true)
    expect(result.request.response.source.context.hasPrevious).toBe(true)
    expect(result.request.response.source.context.showNextEllipsis).toBe(true)
    expect(result.request.response.source.context.showPreviousEllipsis).toBe(false)
  })

  test('GET /eligible-organisations with over 10 organisations on 2nd last page returns correct pagination flags', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=7',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.page).toBe(7)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.hasNext).toBe(true)
    expect(result.request.response.source.context.hasPrevious).toBe(true)
    expect(result.request.response.source.context.showNextEllipsis).toBe(false)
    expect(result.request.response.source.context.showPreviousEllipsis).toBe(true)
  })

  test('GET /eligible-organisations with over 10 organisations on middle page returns correct pagination flags', async () => {
    const options = {
      method: 'GET',
      url: '/eligible-organisations?page=4',
      headers: { authorization: token }
    }

    getEligibility.mockResolvedValue(
      {
        eligibility: organisationsLarge,
        agreement: {
          selectedOrganisation: []
        }
      }
    )

    const result = await server.inject(options)
    expect(result.request.response.source.context.page).toBe(4)
    expect(result.request.response.source.context.totalPages).toBe(8)
    expect(result.request.response.source.context.hasNext).toBe(true)
    expect(result.request.response.source.context.hasPrevious).toBe(true)
    expect(result.request.response.source.context.showNextEllipsis).toBe(true)
    expect(result.request.response.source.context.showPreviousEllipsis).toBe(true)
  })

  test('POST /eligible-organisations Auth mode "required" token incorrect callerId', async () => {
    token = JWT.sign({ callerId: 9999 }, config.jwtConfig.secret)
    const options = {
      method: 'POST',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /eligible-organisations Auth mode "required" token expired', async () => {
    token = JWT.sign({ callerId }, config.jwtConfig.secret, { expiresIn: '1ms' })
    const options = {
      method: 'POST',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /eligible-organisations Auth mode "required" should require header', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /eligible-organisations Auth mode "required" should fail with invalid token', async () => {
    token = JWT.sign({ callerId }, 'bad secret')
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /eligible-organisations with valid SBI number returns a record with that SBI number', async () => {
    const options = {
      method: 'POST',
      url: '/eligible-organisations',
      headers: { authorization: token },
      payload: { sbi: 987654321 }
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
      headers: { authorization: token },
      payload: { sbi: 104999999 }
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
      headers: { authorization: token },
      payload: { sbi: 1000000000 }
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
      headers: { authorization: token },
      payload: { sbi: '123abc456' }
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
      headers: { authorization: token },
      payload: { sbi: 105000001 }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('No organisation matching SBI.')
  })
})
