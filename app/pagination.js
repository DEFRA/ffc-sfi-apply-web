const LIMIT = 10

const getPagination = (page = 1, limit = LIMIT) => {
  return page === 1 ? 0 : (page - 1) * limit
}

const getPagingData = (total, page, url, limit = LIMIT) => {
  const totalPages = getTotalPages(total, limit)

  const hasNext = page + 1 <= totalPages
  const hasPrevious = page - 1 > 0
  const showNextEllipsis = page + 1 <= totalPages - 2
  const showPreviousEllipsis = page - 1 > 2

  return { page, totalPages, total, limit, url, hasNext, hasPrevious, showNextEllipsis, showPreviousEllipsis }
}

const getTotalPages = (total, limit = LIMIT) => {
  return Math.ceil(total / limit)
}

module.exports = {
  LIMIT,
  getTotalPages,
  getPagination,
  getPagingData
}
