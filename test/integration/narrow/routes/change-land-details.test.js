const JWT = require('jsonwebtoken')
const config = require('../../../../app/config')

describe('change land details route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  const createServer = require('../../../../app/server')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  let server
  let token
  const callerId = 123456789

  beforeEach(async () => {
    token = JWT.sign({ callerId }, config.jwtConfig.secret)
    mockCache.get.mockResolvedValue(
      {
        application: {
          callerId
        }
      })

    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /change-land-details without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/')
  })

  test('GET /change-land-details with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /change-land-details with auth returns land/change-land-details view', async () => {
    const options = {
      method: 'GET',
      url: '/change-land-details',
      headers: { authorization: token }
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('land/change-land-details')
  })
})
