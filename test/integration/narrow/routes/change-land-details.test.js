describe('change land details route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  const createServer = require('../../../../app/server')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  let server
  let auth
  const crn = 123456789

  beforeEach(async () => {
    auth = { strategy: 'jwt', credentials: { name: 'A Farmer' } }
    mockCache.get.mockResolvedValue({
      crn
    })

    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /change-land-details without auth returns 401', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(401)
    expect(result.headers.location).toBe('/sign-in')
  })

  test('GET /change-land-details with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /change-land-details with auth returns land/change-land-details view', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('land/change-land-details')
  })
})
