describe('check-eligibility funding-options/application-value route', () => {
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

  test('GET /funding-options/application-value returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/application-value'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/application-value returns application-value view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/application-value'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/application-value')
  })

  test('POST /funding-options/application-value returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/application-value'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/application-value redirects to /application-task-list', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/application-value'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/application-task-list')
  })
})
