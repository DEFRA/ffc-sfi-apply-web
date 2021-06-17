describe('check-eligibility funding-options/land-primary-actions route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../../app/api')
  jest.mock('../../../../../app/plugins/crumb')
  jest.mock('../../../../../app/api/map')
  let createServer
  let server

  const { getParcels } = require('../../../../../app/api/map')

  /*   jest.mock('../../../../../app/api/map', () => ({
    getParcels: () => {}
  })) */
  getParcels.mockResolvedValue({ parcels: null })

  beforeEach(async () => {
    createServer = require('../../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /funding-options/land-primary-actions returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-primary-actions'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /funding-options/land-primary-actions returns land-primary-actions view', async () => {
    const options = {
      method: 'GET',
      url: '/funding-options/land-primary-actions'
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding-options/land-primary-actions')
  })

  test('POST /funding-options/land-primary-actions returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: { landInHectares: [{ name: 'SE98491742', value: 2, valid: true }] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /funding-options/land-primary-actions redirects to actions', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: { landInHectares: [{ name: 'SE98491742', value: 2, valid: true }] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('calculation')
  })

  test('POST /funding-options/land-primary-actions returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/funding-options/land-primary-actions',
      payload: { SE98491742: ['23', '8.2'] }
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(400)
  })
})
