describe('check-eligibility funding-options/what-funding route', () => {
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

  test('GET /funding-options/what-funding returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/what-funding'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/what-funding returns what-funding view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/what-funding'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/what-funding')
  })

  test('POST /funding-options/what-funding returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/what-funding',
      payload: { funding: ['arableHorticulturalSoils'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/what-funding redirects to actions-arable-all', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/what-funding',
      payload: { funding: ['arableHorticulturalSoils'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('actions-arable-all')
  })

  test('POST /funding-options/what-funding returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/what-funding',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
