describe('check-eligibility eligible route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/polling')
  const getPollingResponse = require('../../../../../app/polling')
  jest.mock('../../../../../app/plugins/crumb')
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

  test('GET /check-eligibility/eligible returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /check-eligibility/eligible returns eligible view', async () => {
    getPollingResponse.mockResolvedValue({ isEligible: true })

    const options = {
      method: 'GET',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('check-eligibility/eligible')
  })
})
