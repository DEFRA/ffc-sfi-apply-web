describe('payment-details bank-details route', () => {
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

  test('GET /payment-details/bank-details 200', async () => {
    const options = {
      method: 'GET',
      url: '/payment-details/bank-details'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /payment-details/bank-details returns bank-details view', async () => {
    const options = {
      method: 'GET',
      url: '/payment-details/bank-details'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('payment-details/bank-details')
  })

  test('POST /payment-details/bank-details returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/payment-detailsbank-details',
      payload: { bps: 'monthly' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST payment-details/bank-details redirects to application-task-list', async () => {
    const options = {
      method: 'POST',
      url: '/payment-details/bank-details',
      payload: { bps: 'yes' }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('application-task-list')
  })

  test('POST /payment-details/bank-details returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/payment-details/bank-details',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})