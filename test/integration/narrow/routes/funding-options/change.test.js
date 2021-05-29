describe('check-eligibility funding-options/change route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/api')
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
  })

  test('GET /funding-options/change returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/change'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/change returns change view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/change'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/change')
  })

  test('POST /funding-options/change returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/change'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/change redirects to application-value', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/change'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('application-value')
  })
})
