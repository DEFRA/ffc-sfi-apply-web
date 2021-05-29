describe('application task list route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/api')
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

  test('GET /application-task-list returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/application-task-list'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /application-task-list returns application-task-list view', async () => {
    const options = {
      method: 'GET',
      url: '/application-task-list'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('application-task-list')
  })
})
