describe('check-eligibility funding-options/land-increased-actions route', () => {
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

  test('GET /funding-options/land-increased-actions returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-increased-actions'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/land-increased-actions returns land-increased-actions view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-increased-actions'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/land-increased-actions')
  })

  test('POST /funding-options/land-increased-actions returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-increased-actions',
      payload: { greenCover: '100', permanentGrass: '100' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/land-increased-actions redirects to application-value', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-increased-actions',
      payload: { greenCover: '100', permanentGrass: '100' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('application-value')
  })

  test('POST /funding-options/land-increased-actions returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-increased-actions',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
