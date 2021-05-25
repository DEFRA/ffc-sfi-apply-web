describe('check-eligibility land-types route', () => {
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

  test('GET /check-eligibility/land-types returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/land-types'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /check-eligibility/land-types returns land-types view', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/land-types'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('check-eligibility/land-types')
  })

  test('POST /check-eligibility/land-types returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/land-types',
      payload: { landTypes: ['arableHorticultural', 'permanentGrassland'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /check-eligibility/land-types redirects to farming-pilot', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/land-types',
      payload: { landTypes: ['arableHorticultural', 'permanentGrassland'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('farming-pilot')
  })

  test('POST /check-eligibility/land-types returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/land-types',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
