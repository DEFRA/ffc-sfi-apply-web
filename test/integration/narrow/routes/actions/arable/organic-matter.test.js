describe('arable soil organic matter route', () => {
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
            canTestOrganicMatter: undefined
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

  test('GET /arable/organic-matter without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/arable/organic-matter'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /arable/organic-matter with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /arable/organic-matter with auth returns arable/organic-matter view', async () => {
    const options = {
      method: 'GET',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('actions/arable-soil/organic-matter')
  })

  test('GET /arable/organic-matter value is undefined if not in cache', async () => {
    const options = {
      method: 'GET',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.canTestOrganicMatter).toBeUndefined()
  })

  test('GET /arable/organic-matter value to be set if true in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canTestOrganicMatter = true
    const options = {
      method: 'GET',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[0].checked).toBeTruthy()
  })

  test('GET /arable/organic-matter value to be set if false in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canTestOrganicMatter = false
    const options = {
      method: 'GET',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[1].checked).toBeTruthy()
  })

  test('POST /arable/organic-matter with no value returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/arable/organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('Select an option')
  })

  test('POST /arable/organic-matter updates cache if true', async () => {
    const options = {
      method: 'POST',
      url: '/arable/organic-matter',
      auth,
      payload: {
        canTestOrganicMatter: true
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canTestOrganicMatter: true } } } })
  })

  test('POST /arable/organic-matter updates cache if false', async () => {
    const options = {
      method: 'POST',
      url: '/arable/organic-matter',
      auth,
      payload: {
        canTestOrganicMatter: false
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canTestOrganicMatter: false } } } })
  })

  test('POST /arable/organic-matter saves progress', async () => {
    const options = {
      method: 'POST',
      url: '/arable/organic-matter',
      auth,
      payload: {
        canTestOrganicMatter: true
      }
    }

    await server.inject(options)
    expect(agreement.save).toBeCalled()
  })

  test('POST /arable/organic-matter redirects on post', async () => {
    const options = {
      method: 'POST',
      url: '/arable/organic-matter',
      auth,
      payload: {
        canTestOrganicMatter: true
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/arable/produce-plan')
  })
})
