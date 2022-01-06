describe('change land details route', () => {
  jest.mock('ffc-messaging')
  const createServer = require('../../../../app/server')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  const {create: createAgreement} = require('../../../../app/agreement')
  let server
  let auth
  let cachedData

  beforeEach(async () => {
    auth = {strategy: 'session', credentials: {name: 'A Farmer'}}
    cachedData = {
      callerId: 1234567,
      agreement: createAgreement()
    }
    mockCache.get.mockResolvedValue(cachedData)
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /task-list without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/task-list'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/login')
  })

  test('GET /task-list with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /task-list with auth returns task list view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('task-list')
  })

  test('GET /task-list shows agreement number', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.agreementNumber).toBeDefined()
  })

  test('GET /task-list shows in progress status for if not complete', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.status).toBe('in progress')
  })

  test('GET /task-list shows complete status for if complete', async () => {
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.status).toBe('submitted')
  })

  test('GET /task-list includes correct number of sections on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(0)
  })

  test('GET /task-list shows correct section headings on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Choose your actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Choose your actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status on initial view', async () => {
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(1)
  })

  test('GET /task-list shows correct section headings if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Choose your actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Choose your actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if land section completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only arable soil selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select improved grassland soil parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(3)
  })

  test('GET /task-list shows correct section headings if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only arable soil selected in funding and arable soil completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(3)
  })

  test('GET /task-list shows correct section headings if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only improved grassland selected in funding and improved grassland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-improved-grassland'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(3)
  })

  test('GET /task-list shows correct section headings if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only moorland selected in funding and moorland completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(4)
  })

  test('GET /task-list shows correct section headings if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if single action and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('NOT STARTED YET')
  })

  test('GET /task-list includes correct number of sections if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(5)
  })

  test('GET /task-list shows correct section headings if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if single action and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-moorland']
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('COMPLETED')
  })

  test('GET /task-list includes correct number of sections if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[1].name).toBe('Select improved grassland soil parcels')
    expect(result.request.response.source.context.model.sections[3].tasks[2].name).toBe('Optional improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if arable soil and improved grassland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if arable soil and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select improved grassland soil parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(7)
  })

  test('GET /task-list shows correct total of sections if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(7)
  })

  test('GET /task-list shows correct total completed sections if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[6].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[1].name).toBe('Select improved grassland soil parcels')
    expect(result.request.response.source.context.model.sections[3].tasks[2].name).toBe('Optional improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[6].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if arable soil, improved grassland and moorland selected in funding', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[1].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[6].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(3)
  })

  test('GET /task-list shows correct section headings if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if multiple funding options and first completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(5)
  })

  test('GET /task-list shows correct section headings if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if multiple actions and confirmed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('NOT STARTED YET')
  })

  test('GET /task-list includes correct number of sections if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(6)
  })

  test('GET /task-list shows correct total of sections if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(6)
  })

  test('GET /task-list shows correct total completed sections if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(6)
  })

  test('GET /task-list shows correct section headings if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Moorlands and rough grazing actions')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[5].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if multiple actions and submitted', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil', 'sfi-moorland']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-moorland'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    cachedData.agreement.action['sfi-arable-soil'].optionalActionsComplete = true
    cachedData.agreement.action['sfi-moorland'].actionsComplete = true
    cachedData.agreement.confirmed = true
    cachedData.agreement.submitted = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[5].tasks[0].status).toBe('COMPLETED')
  })

    test('GET /task-list includes correct number of sections if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only arable soil actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only improved grassland actions completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

    test('GET /task-list includes correct number of sections if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[2].tasks[1].name).toBe('Select arable and horticultural soil land parcels')
    expect(result.request.response.source.context.model.sections[2].tasks[2].name).toBe('Optional arable and horticultural soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only arable soil parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-arable-soil']
    cachedData.agreement.action['sfi-arable-soil'].active = true
    cachedData.agreement.action['sfi-arable-soil'].actionsComplete = true
    cachedData.agreement.action['sfi-arable-soil'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })

  test('GET /task-list includes correct number of sections if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections.length).toBe(5)
  })

  test('GET /task-list shows correct total of sections if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.totalSections).toBe(5)
  })

  test('GET /task-list shows correct total completed sections if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.completedSections).toBe(2)
  })

  test('GET /task-list shows correct section headings if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].name).toBe('Your land')
    expect(result.request.response.source.context.model.sections[1].name).toBe('Choose your funding')
    expect(result.request.response.source.context.model.sections[2].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct tasks if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].name).toBe('Confirm your land cover details')
    expect(result.request.response.source.context.model.sections[1].tasks[0].name).toBe('Choose funding option')
    expect(result.request.response.source.context.model.sections[2].tasks[0].name).toBe('Improved grassland soil actions')
    expect(result.request.response.source.context.model.sections[3].tasks[0].name).toBe('Check your answers')
    expect(result.request.response.source.context.model.sections[4].tasks[0].name).toBe('Submit your application')
  })

  test('GET /task-list shows correct task status if only improved grassland parcels completed', async () => {
    cachedData.agreement.land = {
      landComplete: true
    }
    cachedData.agreement.funding = ['sfi-improved-grassland']
    cachedData.agreement.action['sfi-improved-grassland'].active = true
    cachedData.agreement.action['sfi-improved-grassland'].actionsComplete = true
    cachedData.agreement.action['sfi-improved-grassland'].landCovers = [{ parcelId: 'AB12345678' }]
    const options = {
      method: 'GET',
      url: '/task-list',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.source.context.model.sections[0].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[1].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[0].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[1].status).toBe('COMPLETED')
    expect(result.request.response.source.context.model.sections[2].tasks[2].status).toBe('NOT STARTED YET')
    expect(result.request.response.source.context.model.sections[3].tasks[0].status).toBe('CANNOT START YET')
    expect(result.request.response.source.context.model.sections[4].tasks[0].status).toBe('CANNOT START YET')
  })
})

