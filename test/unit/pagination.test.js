const { getTotalPages, getPagination, getPagingData } = require('../../app/pagination')

describe('pagination', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('getTotalPages returns 1 if number of records is less than the default limit', () => {
    const result = getTotalPages(5)
    expect(result).toBe(1)
  })

  test('getTotalPages returns 1 if number of records is equal to the default limit', () => {
    const result = getTotalPages(10)
    expect(result).toBe(1)
  })

  test('getTotalPages returns 2 if number of records is greater than the default limit but less than twice the default limit', () => {
    const result = getTotalPages(16)
    expect(result).toBe(2)
  })

  test('getTotalPages returns 1 if number of records is less than the given limit', () => {
    const result = getTotalPages(4, 9)
    expect(result).toBe(1)
  })

  test('getTotalPages returns 1 if number of records is equal to the given limit', () => {
    const result = getTotalPages(9, 9)
    expect(result).toBe(1)
  })

  test('getTotalPages returns 2 if number of records is greater than the given limit but less than twice the given limit', () => {
    const result = getTotalPages(10, 9)
    expect(result).toBe(2)
  })

  test('getPagination returns 0 by default', () => {
    const result = getPagination()
    expect(result).toBe(0)
  })

  test('getPagination returns 0 when page is 1', () => {
    const result = getPagination(1)
    expect(result).toBe(0)
  })

  test('getPagination returns 10 when page is 2 and using the default limit', () => {
    const result = getPagination(2)
    expect(result).toBe(10)
  })

  test('getPagination returns 90 when page is 10 and using the default limit', () => {
    const result = getPagination(10)
    expect(result).toBe(90)
  })

  test('getPagination returns the limit when page is 2 for a given limit', () => {
    const result = getPagination(2, 7)
    expect(result).toBe(7)
  })

  test('getPagination returns twice the limit when page is 3 for a given limit', () => {
    const result = getPagination(3, 7)
    expect(result).toBe(14)
  })

  test('getPagination returns ten-fold the limit when page is 11 for a given limit', () => {
    const result = getPagination(11, 7)
    expect(result).toBe(70)
  })

  test('getPagingData returns no pagination for single page with under the default limit number of records', () => {
    const result = getPagingData(5, 1, 'test-url')
    expect(result).toMatchObject({ page: 1, totalPages: 1, total: 5, limit: 10, url: 'test-url', hasNext: false, hasPrevious: false, showNextEllipsis: false, showPreviousEllipsis: false })
  })

  test('getPagingData returns no pagination for single page with an equal number of records to the default limit', () => {
    const result = getPagingData(10, 1, 'test-url')
    expect(result).toMatchObject({ page: 1, totalPages: 1, total: 10, limit: 10, url: 'test-url', hasNext: false, hasPrevious: false, showNextEllipsis: false, showPreviousEllipsis: false })
  })

  test('getPagingData returns next navigation pagination for two pages with the user on the first page', () => {
    const result = getPagingData(11, 1, 'test-url')
    expect(result).toMatchObject({ page: 1, totalPages: 2, total: 11, limit: 10, url: 'test-url', hasNext: true, hasPrevious: false, showNextEllipsis: false, showPreviousEllipsis: false })
  })

  test('getPagingData returns previous navigation pagination for two pages with the user on the last page', () => {
    const result = getPagingData(11, 2, 'test-url')
    expect(result).toMatchObject({ page: 2, totalPages: 2, total: 11, limit: 10, url: 'test-url', hasNext: false, hasPrevious: true, showNextEllipsis: false, showPreviousEllipsis: false })
  })

  test('getPagingData next and previous navigation returns pagination for four pages with the user on a middle page', () => {
    const result = getPagingData(36, 2, 'test-url')
    expect(result).toMatchObject({ page: 2, totalPages: 4, total: 36, limit: 10, url: 'test-url', hasNext: true, hasPrevious: true, showNextEllipsis: false, showPreviousEllipsis: false })
  })

  test('getPagingData returns next navigation and next ellipses pagination for five pages with the user on the first page', () => {
    const result = getPagingData(41, 1, 'test-url')
    expect(result).toMatchObject({ page: 1, totalPages: 5, total: 41, limit: 10, url: 'test-url', hasNext: true, hasPrevious: false, showNextEllipsis: true, showPreviousEllipsis: false })
  })

  test('getPagingData returns previous navigation and previous ellipses pagination for five pages with the user on the last page', () => {
    const result = getPagingData(41, 5, 'test-url')
    expect(result).toMatchObject({ page: 5, totalPages: 5, total: 41, limit: 10, url: 'test-url', hasNext: false, hasPrevious: true, showNextEllipsis: false, showPreviousEllipsis: true })
  })

  test('getPagingData returns next navigation, previous navigation and next ellipses pagination for eight pages with the user on the second page', () => {
    const result = getPagingData(72, 2, 'test-url')
    expect(result).toMatchObject({ page: 2, totalPages: 8, total: 72, limit: 10, url: 'test-url', hasNext: true, hasPrevious: true, showNextEllipsis: true, showPreviousEllipsis: false })
  })

  test('getPagingData returns next navigation, previous navigation and previous ellipses pagination for eight pages with the user on the seventh page', () => {
    const result = getPagingData(72, 7, 'test-url')
    expect(result).toMatchObject({ page: 7, totalPages: 8, total: 72, limit: 10, url: 'test-url', hasNext: true, hasPrevious: true, showNextEllipsis: false, showPreviousEllipsis: true })
  })

  test('getPagingData returns next navigation, previous navigation, next ellipses and previous ellipses pagination for eight pages with the user on the fifth page', () => {
    const result = getPagingData(72, 5, 'test-url')
    expect(result).toMatchObject({ page: 5, totalPages: 8, total: 72, limit: 10, url: 'test-url', hasNext: true, hasPrevious: true, showNextEllipsis: true, showPreviousEllipsis: true })
  })
})
