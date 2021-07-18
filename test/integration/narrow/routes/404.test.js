describe('404', () => {
  jest.mock('ffc-messaging')
  let createServer
  let server

  beforeEach(async () => {
    createServer = require('../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET invalid route returns 404', async () => {
    const options = {
      method: 'GET',
      url: '/this-is-not-real'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(404)
  })
})
