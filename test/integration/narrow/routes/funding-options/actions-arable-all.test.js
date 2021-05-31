describe('check-eligibility funding-options/actions-arable-all route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/api')
  jest.mock('../../../../../app/plugins/crumb')
  jest.mock('../../../../../app/polling')
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

  test('GET /funding-options/actions-arable-all returns 200', async () => {
    getPollingResponse.mockResolvedValue({ isValid: true })
    const options = {
      method: 'GET',
      url: '/funding-options/actions-arable-all'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/actions-arable-all returns actions-arable-all view', async () => {
    getPollingResponse.mockResolvedValue({ isValid: true })
    const options = {
      method: 'GET',
      url: '/funding-options/actions-arable-all'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/actions-arable-all')
  })

  test('POST /funding-options/actions-arable-all returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/actions-arable-all',
      payload: { primaryActions: ['cultivateDrillSlope', 'stripTillageNotil', 'soilManagementPlan', 'avoidMachineryTraffic'], paymentActions: ['establishGreenCover'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/actions-arable-all redirects to land-primary-actions', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/actions-arable-all',
      payload: { primaryActions: ['cultivateDrillSlope', 'stripTillageNotil', 'soilManagementPlan', 'avoidMachineryTraffic'], paymentActions: ['establishGreenCover'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('land-primary-actions')
  })

  test('POST /funding-options/actions-arable-all returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/actions-arable-all',
      payload: {}
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
