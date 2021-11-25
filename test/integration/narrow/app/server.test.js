describe('Server test', () => {
  test('createServer returns server', () => {
    jest.mock('../../../../app/config/mq-config')
    const server = require('../../../../app/server')
    expect(server).toBeDefined()
  })
})
