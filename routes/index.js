const users = require('./users')
const login = require('./login')
const signUp = require('./signUp')

module.exports = router => {
  users(router)
  login(router)
  signUp(router)
  return router
}
