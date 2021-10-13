const cache = require('../../../../app/cache')

describe('which-business route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/eligibility')
  const getEligibility = require('../../../../app/eligibility')
  
  let createServer
  let server
  const organisationId = 1234567
  const name = 'Title Forename Lastname'
  const sbi = '123456789'

  getEligibility.mockResolvedValue(
    { 
      eligibility: [{
        sbi,
        name,
        organisationId,
        address: 'address1, address2, address3, postalCode'
      }], 
      applyJourney: {
        selectedOrganisation: {
          sbi,
          name,
          organisationId,
          address: 'address1, address2, address, postalCode'
        }
      } 
    }
  )

  beforeEach(async () => {
    createServer = require('../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
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
