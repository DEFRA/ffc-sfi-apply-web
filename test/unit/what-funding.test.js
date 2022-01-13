describe('process standards message', () => {
  const mockSendMessage = jest.fn()
  const mockReceiveMessage = jest.fn(() => {
    return [{ body: mockEligibleFunding }]
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

  const { mapStandards } = require('../../app/what-funding')

  let createServer
  let server

  const mockEligibleFunding = [{
    code: 'sfi-arable-soil',
    name: 'arable and horticultural soil',
    text: 'Funding for arable and horticultural soil',
    hint: '£22 to £40 per hectare per year based on what work you do.',
    landCovers:
      [{ parcelId: 'AA12345678', code: '110', area: '5.10' }, { parcelId: 'BB12345678', code: '110', area: '8.21' }, { parcelId: 'CC12345678', code: '110', area: '1.09' }]
  }, {
    code: 'sfi-improved-grassland',
    name: 'improved grassland soil',
    text: 'Funding for improved grassland soil',
    hint: '£28 to £58 per hectare per year based on what work you do.',
    landCovers:
    [{ parcelId: 'ZZ98765432', code: '130', area: '14.00' }, { parcelId: 'YY98765432', code: '130', area: '1.72' }, { parcelId: 'XX98765432', code: '130', area: '5.22' }]
  }]

  beforeAll(async () => {
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

  test('mapStandards with no eligible standards returns empty array', async () => {
    const result = mapStandards([])
    expect(result).toStrictEqual([])
  })

  test('mapStandards with eligible standards returns their code, text and hint text', async () => {
    const result = mapStandards(mockEligibleFunding)
    expect(result).toStrictEqual(mockEligibleFunding.map(funding => { return { value: funding.code, text: funding.text, hint: { text: funding.hint } } }))
  })

  test('mapStandards with eligible standards with no land parcel does not return it', async () => {
    const eligibleFundingWithNoLandParcel = [{
      code: 'sfi-moorland',
      name: 'moorland or rough grazing',
      text: 'Funding for moorland or rough grazing',
      hint: '£6.45 per hectare per year, plus a single payment of £148 per year.',
      landCovers: []
    }]

    const result = mapStandards(eligibleFundingWithNoLandParcel)
    expect(result).toStrictEqual([])
  })
})
