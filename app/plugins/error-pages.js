/*
* Add an `onPreResponse` listener to return error pages
*/

module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom && !request.path.startsWith('/api/')) {
          // An error was raised during
          // processing the request
          const statusCode = response.output.statusCode

          // In the event of 404
          // return the `404` view
          if (statusCode === 404) {
            return h.view('404').code(statusCode)
          }

          // In the event of 401
          // redirect to sign-in
          if (statusCode === 401) {
            return h.redirect('/sign-in')
          }

          request.log('error', {
            statusCode: statusCode,
            data: response.data,
            message: response.message
          })

          // The return the `500` view
          return h.view('500').code(statusCode)
        }
        return h.continue
      })
    }
  }
}
