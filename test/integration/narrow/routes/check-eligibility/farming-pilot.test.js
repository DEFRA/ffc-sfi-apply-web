describe('check-eligibility farming-pilot route', () => {
  let createServer
  let server

  beforeEach(async () => {
    createServer = require('../../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /check-eligibility/farming-pilot returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/farming-pilot'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /check-eligibility/farming-pilot returns farming-pilot view', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/farming-pilot'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('check-eligibility/farming-pilot')
  })

  test('POST /check-eligibility/farming-pilot returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/farming-pilot',
      payload: { farmingPilot: 'yes' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /check-eligibility/farming-pilot redirects to eligible', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/farming-pilot',
      payload: { farmingPilot: 'yes' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('eligible')
  })

  test('POST /check-eligibility/farming-pilot redirects to land-types', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/farming-pilot',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
