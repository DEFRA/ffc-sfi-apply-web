describe('arable soil green cover route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../../app/plugins/crumb')
  jest.mock('../../../../../../app/agreement')
  const agreement = require('../../../../../../app/agreement')
  const createServer = require('../../../../../../app/server')
  jest.mock('../../../../../../app/cache')
  const mockCache = require('../../../../../../app/cache')
  let server
  let auth
  let cachedData

  beforeEach(async () => {
    auth = { strategy: 'session', credentials: { name: 'A Farmer' } }
    cachedData = {
      agreement: {
        action: {
          'sfi-arable-soil': {
            canHaveGreenCover: undefined
          }
        }
      }
    }
    mockCache.get.mockResolvedValue(cachedData)

    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /arable/green-cover without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/arable/green-cover'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /arable/green-cover with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /arable/green-cover with auth returns arable/green-cover view', async () => {
    const options = {
      method: 'GET',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('actions/arable-soil/green-cover')
  })

  test('GET /arable/green-cover value is undefined if not in cache', async () => {
    const options = {
      method: 'GET',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.canHaveGreenCover).toBeUndefined()
  })

  test('GET /arable/green-cover value to be set if true in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canHaveGreenCover = true
    const options = {
      method: 'GET',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[0].checked).toBeTruthy()
  })

  test('GET /arable/green-cover value to be set if false in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canHaveGreenCover = false
    const options = {
      method: 'GET',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[1].checked).toBeTruthy()
  })

  test('POST /arable/green-cover with no value returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/arable/green-cover',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('Select an option')
  })

  test('POST /arable/green-cover updates cache if true', async () => {
    const options = {
      method: 'POST',
      url: '/arable/green-cover',
      auth,
      payload: {
        canHaveGreenCover: true
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canHaveGreenCover: true } } } })
  })

  test('POST /arable/green-cover updates cache if false', async () => {
    const options = {
      method: 'POST',
      url: '/arable/green-cover',
      auth,
      payload: {
        canHaveGreenCover: false
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canHaveGreenCover: false } } } })
  })

  test('POST /arable/green-cover saves progress', async () => {
    const options = {
      method: 'POST',
      url: '/arable/green-cover',
      auth,
      payload: {
        canHaveGreenCover: true
      }
    }

    await server.inject(options)
    expect(agreement.save).toBeCalled()
  })

  test('POST /arable/green-cover redirects on post', async () => {
    const options = {
      method: 'POST',
      url: '/arable/green-cover',
      auth,
      payload: {
        canHaveGreenCover: true
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/arable/add-organic-matter')
  })
})
