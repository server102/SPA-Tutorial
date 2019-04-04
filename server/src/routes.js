const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {
  return app.post('/register',
    AuthControllerPolicy.register,
    AuthController.register
  )
}
