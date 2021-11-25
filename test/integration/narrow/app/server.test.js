describe('Server test', () => {
  jest.mock('../../../../app/config/mq-config')
  test('createServer returns server', () => {
    const server = require('../../../../app/server')
    expect(server).toBeDefined()
  })
})
