describe('confirm details route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/land/land')
  jest.mock('../../../../app/agreement')
  const mockGetLand = require('../../../../app/land/land')
  const createServer = require('../../../../app/server')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  let server
  let auth
  const crn = 123456789

  beforeEach(async () => {
    auth = { strategy: 'jwt', credentials: { name: 'A Farmer' } }

    mockGetLand.mockResolvedValue(
      {
        parcels: []
      }
    )

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

  test('GET /confirm-details with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/confirm-details',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /confirm-details with auth returns view land/confirm-details', async () => {
    const options = {
      method: 'GET',
      url: '/confirm-details',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.template).toBe('land/confirm-details')
  })

  test('GET /confirm-details without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/confirm-details'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /confirm-details with auth no parcels returns /no-response view ', async () => {
    const options = {
      method: 'GET',
      url: '/confirm-details',
      auth
    }

    mockGetLand.mockResolvedValue({})

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.source.template).toBe('no-response')
  })

  test('POST /confirm-details without auth returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/confirm-details'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('POST /confirm-details with auth redirects to /management-control', async () => {
    const options = {
      method: 'POST',
      url: '/confirm-details',
      auth,
      payload: {
        isLandCorrect: true,
        'layer-select': 'road'
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/management-control')
  })

  test('POST /confirm-details with auth redirects to /change-land-details', async () => {
    const options = {
      method: 'POST',
      url: '/confirm-details',
      auth,
      payload: {
        isLandCorrect: false,
        'layer-select': 'road'
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/change-land-details')
  })

  test('POST /confirm-details with auth and no payload returns land/confirm-details view', async () => {
    const options = {
      method: 'POST',
      url: '/confirm-details',
      auth,
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.source.template).toBe('land/confirm-details')
  })

  test('POST /confirm-details with auth and no landControlCheck returns land/confirm-details view', async () => {
    const options = {
      method: 'POST',
      url: '/confirm-details',
      auth,
      payload: {
        'layer-select': 'road'
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.source.template).toBe('land/confirm-details')
  })
})
