describe('payment-details payment-frequency route', () => {
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

  test('GET /payment-details/payment-frequency 200', async () => {
    const options = {
      method: 'GET',
      url: '/payment-details/payment-frequency'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /payment-details/payment-frequency returns payment-frequency view', async () => {
    const options = {
      method: 'GET',
      url: '/payment-details/payment-frequency'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('payment-details/payment-frequency')
  })

  test('POST /payment-details/payment-frequency returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/payment-details/payment-frequency',
      payload: { bps: 'monthly' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST payment-details/payment-frequency redirects to application-task-list', async () => {
    const options = {
      method: 'POST',
      url: '/payment-details/payment-frequency',
      payload: { bps: 'yes' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('application-task-list')
  })

  test('POST /payment-details/payment-frequency returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/payment-details/payment-frequency',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
