const getDataByRow = async (rowNumber, columnName) => {
  const columnKey = {
    organisation: 1,
    sbi: 2,
    application: 3,
    link: 4
  }
  return await $(`.govuk-table tbody > tr:nth-child(${rowNumber}) > td:nth-child(${columnKey[columnName]})`)
}

const rowCount = async () => {
  return await $('.govuk-table').$$(' tbody>tr').length
}

export { getDataByRow, rowCount }

