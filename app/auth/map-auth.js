const mapAuth = (request) => {
  return {
    isAuthenticated: request.auth.isAuthenticated
  }
}

module.exports = mapAuth
