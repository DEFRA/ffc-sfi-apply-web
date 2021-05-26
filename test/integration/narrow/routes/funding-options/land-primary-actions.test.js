describe('check-eligibility funding-options/land-primary-actions route', () => {
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

  test('GET /funding-options/land-primary-actions returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-primary-actions'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/land-primary-actions returns land-primary-actions view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-primary-actions'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/land-primary-actions')
  })

  test('POST /funding-options/land-primary-actions returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: { landInHectares: '100' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/land-primary-actions redirects to actions-arable-all', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: { landInHectares: '100' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('land-increased-actions')
  })

  test('POST /funding-options/land-primary-actions returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})