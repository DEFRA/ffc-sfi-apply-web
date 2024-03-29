describe('404', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  const createServer = require('../../../../app/server')
  let server

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()

    mockCache.get.mockResolvedValue({
      crn: 123456789
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET invalid route returns 404', async () => {
    const options = {
      method: 'GET',
      url: '/this-is-not-real'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(404)
  })

  test('GET invalid route returns 404 view', async () => {
    const options = {
      method: 'GET',
      url: '/this-is-not-real'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('404')
  })
})
