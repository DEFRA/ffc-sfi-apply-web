describe('check-eligibility funding-options/standards route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/api')
  jest.mock('../../../../../app/plugins/crumb')
  jest.mock('../../../../../app/polling')
  const getPollingResponse = require('../../../../../app/polling')
  let createServer
  let server

  beforeEach(async () => {
    createServer = require('../../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })

  test('GET /funding-options/standards returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/standards'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/standards returns standards view', async () => {
    getPollingResponse.mockResolvedValue({
      standards: [{
        id: 1,
        name: 'soilProtection'
      },
      {
        id: 2,
        name: 'permanentGrasslandProtection'
      }, {
        id: 3,
        name: 'livestockWelfare'
      }]
    })
    const options = {
      method: 'GET',
      url: '/funding-options/standards'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/standards')
  })

  test('POST /funding-options/standards returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/standards',
      payload: { standards: ['soilProtection'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/standards redirects to actions', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/standards',
      payload: { standards: ['soilProtection'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('actions')
  })

  test('POST /funding-options/standards returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/standards',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
