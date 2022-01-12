describe('arable soil produce plan route', () => {
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
            canProducePlan: undefined
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

  test('GET /arable/produce-plan without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/arable/produce-plan'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /arable/produce-plan with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /arable/produce-plan with auth returns arable/produce-plan view', async () => {
    const options = {
      method: 'GET',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('actions/arable-soil/produce-plan')
  })

  test('GET /arable/produce-plan value is undefined if not in cache', async () => {
    const options = {
      method: 'GET',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.canProducePlan).toBeUndefined()
  })

  test('GET /arable/produce-plan value to be set if true in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canProducePlan = true
    const options = {
      method: 'GET',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[0].checked).toBeTruthy()
  })

  test('GET /arable/produce-plan value to be set if false in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canProducePlan = false
    const options = {
      method: 'GET',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[1].checked).toBeTruthy()
  })

  test('POST /arable/produce-plan with no value returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/arable/produce-plan',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('Select an option')
  })

  test('POST /arable/produce-plan updates cache if true', async () => {
    const options = {
      method: 'POST',
      url: '/arable/produce-plan',
      auth,
      payload: {
        canProducePlan: true
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canProducePlan: true } } } })
  })

  test('POST /arable/produce-plan updates cache if false', async () => {
    const options = {
      method: 'POST',
      url: '/arable/produce-plan',
      auth,
      payload: {
        canProducePlan: false
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canProducePlan: false } } } })
  })

  test('POST /arable/produce-plan saves progress', async () => {
    const options = {
      method: 'POST',
      url: '/arable/produce-plan',
      auth,
      payload: {
        canProducePlan: true
      }
    }

    await server.inject(options)
    expect(agreement.save).toBeCalled()
  })

  test('POST /arable/produce-plan redirects on post', async () => {
    const options = {
      method: 'POST',
      url: '/arable/produce-plan',
      auth,
      payload: {
        canProducePlan: true
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/arable/green-cover')
  })
})
