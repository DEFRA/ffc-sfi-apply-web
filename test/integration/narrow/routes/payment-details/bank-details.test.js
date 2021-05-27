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
})
