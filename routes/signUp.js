const controller = require('../controllers/signUp')
// const { validateToken } = require('../utils')

module.exports = router => {
  router.route('/signUp').post(controller.signUp)
}
