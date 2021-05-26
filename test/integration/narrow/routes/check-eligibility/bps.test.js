describe('check-eligibility bps route', () => {
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

  test('GET /check-eligibility/bps returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/bps'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /check-eligibility/bps returns bps view', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/bps'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('check-eligibility/bps')
  })

  test('POST /check-eligibility/bps returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/bps',
      payload: { bps: true }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /check-eligibility/bps redirects to land-types', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/bps',
      payload: { bps: true }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('land-types')
  })

  test('POST /check-eligibility/bps returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/bps',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
