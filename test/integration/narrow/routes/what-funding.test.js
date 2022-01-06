describe('what-funding route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')
  jest.mock('../../../../app/funding/get-funding')
  const getFunding = require('../../../../app/funding/get-funding')

  let createServer
  let server
  let auth

  const initialCache = {
    crn: 123456789,
    callerId: 1234567,
    navigation: {
      previous: 'task-list'
    },
    agreement: {
      agreementNumber: 'AB12345678', // pragma: allowlist secret
      organisation: {
        sbi: 987654321,
        name: 'A Farmer',
        organisationId: 1234789,
        address: 'A Farm'
      },
      land: {
        isLandCorrect: undefined,
        hasManagementControl: undefined
      },
      funding: [],
      action: {}
    },
    data: {
      eligibleOrganisations: [
        {
          sbi: 123456789,
          name: 'A Farmer',
          organisationId: 1234567,
          address: 'A Farm'
        }
      ],
      land: {
        filename: '1234567.json'
      },
      eligibleStandards: [
        {
          code: 'sfi-arable-soil',
          name: 'Arable and horticultural Soils',
          landCovers: [
            {
              parcelId: 'AB12345678',
              code: '110',
              area: 20.56
            },
            {
              parcelId: 'AB987654321',
              code: '110',
              area: 20.56
            }
          ]
        },
        {
          code: 'sfi-improved-grassland',
          name: 'Improved Grassland',
          landCovers: [
            {
              parcelId: 'AB12345678',
              code: '130',
              area: 20.56
            },
            {
              parcelId: 'AB987654321',
              code: '130',
              area: 20.56
            }
          ]
        },
        {
          code: 'sfi-moorland',
          name: 'Moorland and rough grazing'
        }
      ],
      eligibleStandardsSpatial: {
        arableSoil: {
          filename: '1234567-sfi-arable-soil.json'
        },
        improvedGrassland: {
          filename: '1234567-sfi-improved-grassland.json'
        }
      },
      eligibleFunding: []
    }
  }

  const populatedCache = JSON.parse(JSON.stringify(initialCache))
  populatedCache.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
  populatedCache.agreement.action = {
    'sfi-arable-soil': {
      actionsComplete: false,
      active: true,
      canTestOrganicMatter: undefined,
      canAssessSoil: undefined,
      canProducePlan: undefined,
      canHaveGreenCover: undefined,
      canAddOrganicMatter: undefined,
      canDiversifySpecies: undefined,
      landCovers: [
        {
          parcelId: 'AB12345678',
          code: '110',
          area: 20.56,
          rate: 'introductory',
          paymentAmount: 100.20
        },
        {
          parcelId: 'AB87654321',
          code: '110',
          area: 20.56,
          rate: 'intermediate',
          paymentAmount: 200.10
        }
      ],
      paymentAmount: 300.30
    },
    'sfi-improved-grassland': {
      actionsComplete: false,
      active: true,
      canTestOrganicMatter: undefined,
      canAssessSoil: undefined,
      canProducePlan: undefined,
      canHaveGreenCover: undefined,
      canEstablishHerbalLeys: undefined,
      landCovers: [
        {
          parcelId: 'AB12345678',
          code: '130',
          area: 20.56,
          rate: 'intermediate',
          paymentAmount: 100.64
        }
      ],
      paymentAmount: 100.64
    },
    'sfi-moorland': {
      actionsComplete: false,
      active: false,
      paymentAmount: 420.00
    },
    paymentAmount: 820.94
  }

  beforeEach(async () => {
    auth = { strategy: 'session', credentials: { name: 'A Farmer' } }

    mockCache.get.mockResolvedValue(initialCache)

    // TODO: what does this happy path return
    // TODO: does jest handle this being async?
    getFunding.mockResolvedValue([{
      code: 'sfi-arable-soil',
      name: 'arable and horticultural soil',
      landCovers:
        [{ parcelId: 'AA12345678', code: '110', area: '5.10' }, { parcelId: 'BB12345678', code: '110', area: '8.21' }, { parcelId: 'CC12345678', code: '110', area: '1.09' }]
    }, {
      code: 'sfi-improved-grassland',
      name: 'improved grassland soil',
      landCovers:
      [{ parcelId: 'ZZ98765432', code: '130', area: '14.00' }, { parcelId: 'YY98765432', code: '130', area: '1.72' }, { parcelId: 'XX98765432', code: '130', area: '5.22' }]
    }
    ])

    createServer = require('../../../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })

  test('GET /what-funding without auth returns 302', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /what-funding with auth returns 200 and funding/what-funding view', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
  })

  test('GET /what-funding first time round returns an empty funding array within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    await server.inject(options)
    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual([])
  })

  test('GET /what-funding first time round returns an empty action object within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    await server.inject(options)
    const { action } = (await mockCache.get()).agreement
    expect(action).toStrictEqual({})
  })

  test('GET /what-funding first time round returns an empty eligibleFunding array within data cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    await server.inject(options)
    const { eligibleFunding } = (await mockCache.get()).data
    expect(eligibleFunding).toStrictEqual([])
  })

  test('GET /what-funding with no eligible funding options returns no-response view', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    getFunding.mockResolvedValue(undefined)

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('no-response')
  })

  test('GET /what-funding with 2 eligible funding options returns funding/what-funding view', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
  })

  test('GET /what-funding with 1 previously selected funding option returns this option as a string array within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect([funding[0]]).toStrictEqual(['sfi-arable-soil'])
  })

  test('GET /what-funding with 2 previously selected funding options returns those options as a string array within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil', 'sfi-improved-grassland'])
  })

  test('POST /what-funding with valid standard redirects', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /what-funding with 1 valid standard stores this standard in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect([funding[0]]).toStrictEqual(['sfi-arable-soil'])
  })

  test('POST /what-funding with 2 valid standards stores these standards in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil', 'sfi-improved-grassland'])
  })

  test('POST /what-funding with 1 valid standard updates the standard as active in the agreement action cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    const preAction = (await mockCache.get()).agreement.action

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const postAction = (await mockCache.get()).agreement.action
    expect(preAction).toStrictEqual({})
    expect(postAction['sfi-arable-soil'].active).toBe(true)
  })

  test('POST /what-funding with 2 valid standards updates those standard as active in the agreement action cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil', 'sfi-improved-grassland'] },
      auth
    }

    const preAction = (await mockCache.get()).agreement.action

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const postAction = (await mockCache.get()).agreement.action

    expect(preAction).toStrictEqual({})
    expect(postAction['sfi-arable-soil'].active).toBe(true)
    expect(postAction['sfi-improved-grassland'].active).toBe(true)
  })

  test('POST /what-funding with 1 previously selected standard updates the standard as active in the agreement action cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    let preAction = { ...populatedCache }
    preAction.agreement.action['sfi-arable-soil'].active = false
    preAction = preAction.agreement.action

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const postAction = (await mockCache.get()).agreement.action

    expect(preAction['sfi-arable-soil'].active).toBe(false)
    expect(preAction['sfi-improved-grassland'].active).toBe(true)
    expect(postAction['sfi-arable-soil'].active).toBe(true)
    expect(preAction['sfi-improved-grassland'].active).toBe(false)
  })

  test('POST /what-funding with no eligible funding redirects', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    // TODO: data/eligiblefunding doesn't exist or length == 0
    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
  })

  test('POST /what-funding with invalid standard redirects', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['not-a-real-standard'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
  })

  test('POST /what-funding with no standard and no eligibleFunding options redirects', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: [] },
      auth
    }

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
  })

  test('POST /what-funding with no standard and with valid eligibleFunding returns funding/what-funding view with an error message', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: [] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
    expect(result.request.response.source.context.model.error.errorList.text).toEqual('Select an option')
  })
})
