describe('what-funding route', () => {
  const mockCache = require('../../../../app/cache')
  const getFunding = require('../../../../app/funding/get-funding')
  const { create: createAgreement } = require('../../../../app/agreement')

  jest.mock('ffc-messaging')
  jest.mock('../../../../app/plugins/crumb')
  jest.mock('../../../../app/cache')
  jest.mock('../../../../app/funding/get-funding')

  let createServer
  let server
  let auth

  const initialCache = {
    crn: 123456789,
    callerId: 1234567,
    navigation: {
      previous: 'task-list'
    },
    agreement: createAgreement(),
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

  // user selected arable and grassland
  const populatedCache = JSON.parse(JSON.stringify(initialCache))
  populatedCache.agreement.funding = ['sfi-arable-soil', 'sfi-improved-grassland']
  populatedCache.agreement.action['sfi-arable-soil'].active = true
  populatedCache.agreement.action['sfi-improved-grassland'].active = true

  // user returns, deselects grassland and only selects arable
  const returnedCache = JSON.parse(JSON.stringify(populatedCache))
  returnedCache.agreement.funding = ['sfi-arable-soil']
  returnedCache.agreement.action['sfi-improved-grassland'].active = false

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
    expect(result.headers.location).toBe('/login')
  })

  test('GET /what-funding with auth returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(200)
  })

  test('GET /what-funding with auth returns funding/what-funding view', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    const result = await server.inject(options)
    expect(result.request.response.variety).toBe('view')
    expect(result.request.response.source.template).toBe('funding/what-funding')
  })

  test('GET /what-funding returns an empty funding array within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    await server.inject(options)
    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual([])
  })

  test('GET /what-funding returns an action object with correct keys within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    await server.inject(options)
    const { action } = (await mockCache.get()).agreement
    expect(Object.keys(action)).toStrictEqual(['sfi-arable-soil', 'sfi-improved-grassland', 'sfi-moorland', 'paymentAmount'])
  })

  test('GET /what-funding returns an empty eligible funding array within data cache', async () => {
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

  test('GET /what-funding with eligible funding options returns funding/what-funding view', async () => {
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

  test('GET /what-funding with 1 previously selected funding option returns this standard as a string array within agreement cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    populatedCache.agreement.funding = ['sfi-arable-soil']

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil'])
  })

  test('GET /what-funding with 1 previously selected funding option returns this standard as active within agreement action cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    populatedCache.agreement.action['sfi-improved-grassland'].active = false

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { action } = (await mockCache.get()).agreement
    expect(action['sfi-arable-soil'].active).toBe(true)
    expect(action['sfi-improved-grassland'].active).toBe(false)
    expect(action['sfi-moorland'].active).toBe(false)
  })

  test('GET /what-funding with 2 previously selected funding options returns those standards as a string array within agreement cache', async () => {
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

  test('GET /what-funding with 2 previously selected funding options returns those standards as active within agreement action cache', async () => {
    const options = {
      method: 'GET',
      url: '/what-funding',
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { action } = (await mockCache.get()).agreement
    expect(action['sfi-arable-soil'].active).toBe(true)
    expect(action['sfi-improved-grassland'].active).toBe(true)
    expect(action['sfi-moorland'].active).toBe(false)
  })

  test('POST /what-funding with 1 valid standard and eligible funding options returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    const result = await server.inject(options)
    expect(result.statusCode).toBe(302)
  })

  test('POST /what-funding with 1 valid standard and eligible funding options stores this standard in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    populatedCache.agreement.funding = ['sfi-arable-soil']
    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil'])
  })

  test('POST /what-funding with 1 valid standard and eligible funding options stores this standard in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    populatedCache.agreement.funding = ['sfi-arable-soil']
    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil'])
  })

  test('POST /what-funding with 2 valid standards and eligible funding options stores these standards in the agreement funding cache', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil', 'sfi-improved-grassland'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    const a = (await mockCache.get())

    await server.inject(options)

    const b = (await mockCache.get())

    const { funding } = (await mockCache.get()).agreement
    expect(funding).toStrictEqual(['sfi-arable-soil', 'sfi-improved-grassland'])
  })

  test('POST /what-funding with 1 valid standard and no eligible funding options returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    getFunding.mockResolvedValue(undefined)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/what-funding')
  })

  test('POST /what-funding with 2 valid standards and no eligible funding options returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    getFunding.mockResolvedValue(undefined)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/what-funding')
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

    expect(preAction['sfi-arable-soil'].active).toStrictEqual(false)
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

    expect(preAction['sfi-arable-soil'].active).toStrictEqual(false)
    expect(preAction['sfi-improved-grassland'].active).toStrictEqual(false)
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

    const preAction = (await mockCache.get()).agreement.action
    preAction['sfi-improved-grassland'].active = true

    mockCache.get.mockResolvedValue(populatedCache)

    await server.inject(options)

    const postAction = (await mockCache.get()).agreement.action

    expect(preAction['sfi-arable-soil'].active).toBe(false)
    expect(preAction['sfi-improved-grassland'].active).toBe(true)
    expect(postAction['sfi-arable-soil'].active).toBe(true)
    expect(postAction['sfi-improved-grassland'].active).toBe(true)
  })

  test('POST /what-funding with valid standard and no eligible funding options returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['sfi-arable-soil'] },
      auth
    }

    getFunding.mockResolvedValue(undefined)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/what-funding')
  })

  // test('POST /what-funding with valid standard and no eligible funding options returns funding/what-funding view', async () => {
  //   const options = {
  //     method: 'POST',
  //     url: '/what-funding',
  //     payload: { standard: ['sfi-arable-soil'] },
  //     auth
  //   }

  //   getFunding.mockResolvedValue(undefined)

  //   const result = await server.inject(options)

  //   expect(result.request.response.variety).toBe('view')
  //   expect(result.request.response.source.template).toBe('funding/what-funding')
  // })

  test('POST /what-funding with invalid standard returns 302', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: ['not-a-real-standard'] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(302)
    expect(result.headers.location).toBe('/what-funding')
  })

  // test('POST /what-funding with invalid standard returns funding/what-funding view', async () => {
  //   const options = {
  //     method: 'POST',
  //     url: '/what-funding',
  //     payload: { standard: ['not-a-real-standard'] },
  //     auth
  //   }

  //   mockCache.get.mockResolvedValue(populatedCache)

  //   const result = await server.inject(options)

  //   expect(result.request.response.variety).toBe('view')
  //   expect(result.request.response.source.template).toBe('funding/what-funding')
  // })

  test('POST /what-funding with no standard and eligible funding options returns 400', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: [] },
      auth
    }

    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.statusCode).toBe(400)
  })

  // test('POST /what-funding with no standard and eligible funding options returns funding/what-funding view', async () => {
  //   const options = {
  //     method: 'POST',
  //     url: '/what-funding',
  //     payload: { standard: [] },
  //     auth
  //   }

  //   mockCache.get.mockResolvedValue(populatedCache)

  //   const result = await server.inject(options)

  //   expect(result.request.response.variety).toBe('view')
  //   expect(result.request.response.source.template).toBe('funding/what-funding')
  // })

  test('POST /what-funding with no standard and eligible funding options returns an error message', async () => {
    const options = {
      method: 'POST',
      url: '/what-funding',
      payload: { standard: [] },
      auth
    }

    populatedCache.data.eligibleFunding = [{
      code: 'sfi-arable-soil',
      name: 'arable and horticultural soil',
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
      ]
    }]

    mockCache.get.mockResolvedValue(populatedCache)

    const result = await server.inject(options)

    expect(result.request.response.source.context.model.error.errorList.text).toEqual('Select an option')
  })

  // test('POST /what-funding with no standard and no eligible funding options returns no-response view', async () => {
  //   const options = {
  //     method: 'POST',
  //     url: '/what-funding',
  //     payload: { standard: [] },
  //     auth
  //   }

  //   getFunding.mockResolvedValue(undefined)

  //   const result = await server.inject(options)

  //   expect(result.request.response.variety).toBe('view')
  //   expect(result.request.response.source.template).toBe('no-response')
  // })
})
