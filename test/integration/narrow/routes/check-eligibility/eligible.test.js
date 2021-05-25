describe('check-eligibility eligible route', () => {
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

  test('GET /check-eligibility/eligible returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /check-eligibility/eligble returns eligible view', async () => {
    const options = {
      method: 'GET',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('check-eligibility/eligible')
  })

  test('POST /check-eligibility/eligible returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /check-eligibility/eligible redirects to application-task-list', async () => {
    const options = {
      method: 'POST',
      url: '/check-eligibility/eligible'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/application-task-list')
  })
})
