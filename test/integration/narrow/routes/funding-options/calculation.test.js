describe('check-eligibility funding-options/calculation route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/api')
  jest.mock('../../../../../app/plugins/crumb')
  jest.mock('../../../../../app/polling')
  jest.mock('../../../../../app/agreement')
  jest.mock('../../../../../app/progress')
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

  test('GET /funding-options/calculation returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/calculation'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/calculation returns calculation view', async () => {
    getPollingResponse.mockResolvedValue({ paymentAmount: 1000 })
    const options = {
      method: 'GET',
      url: '/funding-options/calculation'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/calculation')
  })

  test('POST /funding-options/calculation returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/calculation'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/calculation redirects to /application-task-list', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/calculation'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/application-task-list')
  })
})
