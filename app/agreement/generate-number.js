const generateNumber = () => {
  const dateString = new Date().getTime().toString()
  return `SFIA${dateString.substring(dateString.length - 6)}`
}

module.exports = generateNumber
