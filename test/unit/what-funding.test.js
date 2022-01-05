describe('process standards message', () => {
  const mockSendMessage = jest.fn()
  const mockReceiveMessage = jest.fn(() => {
    return [{
      body: {
        eligibility: [{
          sbi,
          name,
          organisationId,
          address: 'address1, address2, address3, postalCode'
        }]
      }
    }]
  })

  jest.mock('ffc-messaging', () => {
    return {
      MessageSender: jest.fn().mockImplementation(() => {
        return {
          sendMessage: mockSendMessage,
          closeConnection: jest.fn()
        }
      }),
      MessageReceiver: jest.fn().mockImplementation(() => {
        return {
          receiveMessages: mockReceiveMessage,
          acceptSession: jest.fn(),
          completeMessage: jest.fn(),
          closeConnection: jest.fn()
        }
      })
    }
  })

  const { getEligible, getChecked, mapStandards } = require('../../app/what-funding')

  const callerId = 123456
  const crn = 1234567890

  let createServer
  let server
  let request

  const standardItems = {
    'sfi-moorland': {
      text: 'Funding for moorland or rough grazing',
      value: 'sfi-moorland',
      hint: { text: '£6.45 per hectare per year, plus a single payment of £148 per year.' },
      checked: false
    },
    'sfi-arable-soil': {
      text: 'Funding for arable and horticultural soil',
      value: 'sfi-arable-soil',
      hint: { text: '£22 to £40 per hectare per year based on what work you do.' },
      checked: false
    },
    'sfi-improved-grassland': {
      text: 'Funding for improved grassland soil',
      value: 'sfi-improved-grassland',
      hint: { text: '£28 to £58 per hectare per year based on what work you do.' },
      checked: false
    }
  }

  const mockStandards = [{
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
  ]

  beforeAll(async () => {
    request = {
      state: { ffc_sfi_identity: { sid: '1234567890' } },
      server: {
        app: {
          cache: {
            get: () => ({ crn, callerId }),
            set: () => jest.fn()
          }
        }
      }
    }

    createServer = require('../../app/server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  afterAll(async () => {
    await server.stop()
  })

  test('getEligible with 1 valid standard returns the 1 valid standard code as a string array', async () => {
    const result = await getEligible(mockStandards[0], standardItems)
    expect(result).toBe(['sfi-arable-soil'])
  })

  test('getEligible with 2 valid standards returns the 2 valid standard codes as a string array', async () => {
    const result = await getEligible(mockStandards, standardItems)
    expect(result).toBe(['sfi-arable-soil', 'sfi-improved-grassland'])
  })

  test('getEligible with an invalid standard returns an empty string array', async () => {
    const result = await getEligible([{
      code: 'not-a-real-standard',
      name: 'does not exist',
      landCovers:
        [{ parcelId: 'AA12345678', code: '110', area: '5.10' }, { parcelId: 'BB12345678', code: '110', area: '8.21' }, { parcelId: 'CC12345678', code: '110', area: '1.09' }]
    }], standardItems)
    expect(result).toBe([])
  })

  test('getChecked with 1 valid standard set the checked flag for that standard to true', async () => {
    const result = await getChecked(['sfi-arable-soil'], standardItems)
    const changedStandards = { ...standardItems }
    changedStandards['sfi-arable-soil'].checked = true
    expect(result).toBe(changedStandards)
  })

  test('getChecked with 2 valid standards set the checked flags for those standards to true', async () => {
    const result = await getChecked(['sfi-arable-soil', 'sfi-improved-grassland'], standardItems)
    const changedStandards = { ...standardItems }
    changedStandards['sfi-arable-soil'].checked = true
    changedStandards['sfi-improved-grassland'].checked = true
    expect(result).toBe(changedStandards)
  })

  test('getChecked with an invalid standard does not change the object', async () => {
    const result = await getChecked(['not-a-real-standard'], standardItems)
    expect(result).toBe(standardItems)
  })

  test('mapStandards calls getEligible', async () => {
    await mapStandards(mockStandards, [])
    expect(getEligible).toHaveBeenCalled()
  })

  test('mapStandards calls getChecked', async () => {
    await mapStandards(mockStandards, [])
    expect(getChecked).toHaveBeenCalled()
  })

  test('mapStandards with no selected standards returns all provided eligible standards', async () => {
    const result = await mapStandards(mockStandards, [])
    expect(result).toBe([mockStandards.map(standard => standard.code)].map(code => standardItems[code]))
  })

  test('mapStandards with valid selected standard returns all provided eligible standards with the selected being checked', async () => {
    const result = await mapStandards(mockStandards, 'sfi-arable-soil')
    const changedStandards = [mockStandards.map(standard => standard.code)].map(code => standardItems[code])
    changedStandards['sfi-arable-soil'].checked = true
    expect(result).toBe(changedStandards)
  })

  test('mapStandards with 2 valid selected standards returns all provided eligible standards with the selected being checked', async () => {
    const result = await mapStandards(mockStandards, ['sfi-arable-soil', 'sfi-improved-grassland'])
    const changedStandards = [mockStandards.map(standard => standard.code)].map(code => standardItems[code])
    changedStandards['sfi-arable-soil'].checked = true
    changedStandards['sfi-improved-grassland'].checked = true
    expect(result).toBe(changedStandards)
  })

  test('mapStandards with invalid selected standard returns all provided eligible standards', async () => {
    const result = await mapStandards(mockStandards, 'not-a-real-standard')
    const changedStandards = [mockStandards.map(standard => standard.code)].map(code => standardItems[code])
    expect(result).toBe(changedStandards)
  })
})
