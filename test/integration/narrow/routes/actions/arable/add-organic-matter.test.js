describe('arable soil add organic matter route', () => {
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
            canAddOrganicMatter: undefined
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

  test('GET /arable/add-organic-matter without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /arable/add-organic-matter with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /arable/add-organic-matter with auth returns arable/add-organic-matter view', async () => {
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('actions/arable-soil/add-organic-matter')
  })

  test('GET /arable/add-organic-matter value is undefined if not in cache', async () => {
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.canAddOrganicMatter).toBeUndefined()
  })

  test('GET /arable/add-organic-matter value to be set if true in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canAddOrganicMatter = true
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[0].checked).toBeTruthy()
  })

  test('GET /arable/add-organic-matter value to be set if false in cache', async () => {
    cachedData.agreement.action['sfi-arable-soil'].canAddOrganicMatter = false
    const options = {
      method: 'GET',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.items[1].checked).toBeTruthy()
  })

  test('POST /arable/add-organic-matter with no value returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/arable/add-organic-matter',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.context.model.errorMessage.text).toEqual('Select an option')
  })

  test('POST /arable/add-organic-matter updates cache if true', async () => {
    const options = {
      method: 'POST',
      url: '/arable/add-organic-matter',
      auth,
      payload: {
        canAddOrganicMatter: true
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canAddOrganicMatter: true, actionsComplete: true } } } })
  })

  test('POST /arable/add-organic-matter updates cache if false', async () => {
    const options = {
      method: 'POST',
      url: '/arable/add-organic-matter',
      auth,
      payload: {
        canAddOrganicMatter: false
      }
    }

    await server.inject(options)
    expect(mockCache.update.mock.calls[0][1]).toStrictEqual({ agreement: { action: { 'sfi-arable-soil': { canAddOrganicMatter: false, actionsComplete: true } } } })
  })

  test('POST /arable/add-organic-matter saves progress', async () => {
    const options = {
      method: 'POST',
      url: '/arable/add-organic-matter',
      auth,
      payload: {
        canAddOrganicMatter: true
      }
    }

    await server.inject(options)
    expect(agreement.save).toBeCalled()
  })

  test('POST /arable/add-organic-matter redirects on post', async () => {
    const options = {
      method: 'POST',
      url: '/arable/add-organic-matter',
      auth,
      payload: {
        canAddOrganicMatter: true
      }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/task-list')
  })
})
