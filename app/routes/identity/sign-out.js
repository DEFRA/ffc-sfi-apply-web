module.exports = {
  method: 'GET',
  path: '/sign-out',
  options: {
    handler: (request, h) => {
      request.server.app.cache.drop(request.state.ffc_sfi_identity.sid)
      request.cookieAuth.clear()
      return h.redirect('/')
    }
  }
}
