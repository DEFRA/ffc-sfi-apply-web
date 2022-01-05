describe('what-funding route', () => {
  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  const getFunding = require('../../../../app/funding/get-funding')
  jest.mock('../../../../app/cache')
  const mockCache = require('../../../../app/cache')

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
        isLandCorrect: true,
        hasManagementControl: true
      },
      // TODO: is this pop'd before?
      action: {
        'sfi-arable-soil': {
          actionsComplete: true,
          active: true,
          canTestOrganicMatter: true,
          canAssessSoil: true,
          canProducePlan: true,
          canHaveGreenCover: true,
          canAddOrganicMatter: true,
          canDiversifySpecies: true,
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
          canTestOrganicMatter: true,
          canAssessSoil: true,
          canProducePlan: true,
          canHaveGreenCover: true,
          canEstablishHerbalLeys: true,
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
          active: true,
          paymentAmount: 420.00
        },
        paymentAmount: 820.94
      },
      // TODO: do these exist?
      confirmed: true,
      submitted: true
    },
    data: {
      // eligibleOrganisations: [
      //   {
      //     sbi: 123456789,
      //     name: 'A Farmer',
      //     organisationId: 1234567,
      //     address: 'A Farm'
      //   }
      // ],
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
      }
      // ,
      // eligibileFunding: {
      // //response.standards
      // }
    }
  }

  const populatedCache = {
    ...initialCache,
    // TODO: is this pop'd before?
    action: {
      'sfi-arable-soil': {
        actionsComplete: true,
        active: true,
        canTestOrganicMatter: true,
        canAssessSoil: true,
        canProducePlan: true,
        canHaveGreenCover: true,
        canAddOrganicMatter: true,
        canDiversifySpecies: true,
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
        canTestOrganicMatter: true,
        canAssessSoil: true,
        canProducePlan: true,
        canHaveGreenCover: true,
        canEstablishHerbalLeys: true,
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
        active: true,
        paymentAmount: 420.00
      },
      paymentAmount: 820.94
    }
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

  test('GET /what-funding Auth mode "required" should require header', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding'
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('GET /what-funding with no funding object within agreement cache returns empty array', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)

    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')

    expect(result.request.response.source.context.model.selected).toEqual([])
  })

  test('GET /what-funding with 1 funding option within agreement cache returns a string array', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    //  TODO: can I call the prev mockCache.get and append to it?
    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.request.response.source.context.model.selected).toEqual(['sfi-arable-soil'])
  })

  test('GET /what-funding with 2 funding options within agreement cache returns a string array', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    //  TODO: can I call the prev mockCache.get and append to it?
    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.request.response.source.context.model.selected).toEqual(['sfi-arable-soil', 'sfi-improved-grassland'])
  })

  test('GET /what-funding with no eligible funding options returns no-response view', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    getFunding.mockResolvedValue(undefined)

    const result = await server.inject(options)
    // TODO: is this 200?
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('no-response')
  })

  test('GET /what-funding with 1 eligible funding option returns funding/what-funding view', async () => {
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

  // TODO: what keys are mandatory? -- any other like this?
  test('GET /what-funding with 1 eligible funding option returns an object with something in it', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)

    expect(result.request.response.source.context.model.eligibleFunding).toEqual({ a: 1 })
  })

  test('POST /what-funding with valid standard returns funding/how-much view', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/how-much')
  })

  test('POST /what-funding with valid standard stores this standard in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)
    // TODO: how to check funding is there
    expect((mockCache.get).agreement?.funding).toBe(1) // not null
    expect((mockCache.get).agreement?.funding).toEqual(['sfi-arable-soil'])
  })

  test('POST /what-funding with valid standard updates the standard as active in the agreement action cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)
    // TODO: how to check funding is there
    expect((mockCache.get).agreement?.action['sfi-arable-soil']).toBe(1) // not null
    expect((mockCache.get).agreement?.action['sfi-arable-soil'].active).toEqual(true)
  })

  test('POST /what-funding with valid standard updates the standard as actionsComplete in the agreement action cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)
    // TODO: how to check funding is there
    expect((mockCache.get).agreement?.action['sfi-arable-soil']).toBe(1) // not null
    expect((mockCache.get).agreement?.action['sfi-arable-soil'].actionsComplete).toEqual(true)
  })

  test('POST /what-funding with no eligible funding returns funding/what-funding view', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    // TODO: data/eligiblefunding doesn't exist or length == 0
    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
  })

  test('POST /what-funding with invalid standard returns funding/what-funding view', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['not-a-real-standard'] },
      auth
    }

    // TODO: change this
    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(200)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
  })

  test('POST /what-funding with no standard returns funding/what-funding view', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: [] },
      auth
    }

    const result = await server.inject(options)

    expect(result.statusCode).toBe(400)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
    expect(result.request.response.source.context.model.error.errorList.text).toEqual('Select an option')
  })
})
