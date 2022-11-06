const controller = require('../controllers/login')
// const { validateToken } = require('../utils')

module.exports = router => {
  router.route('/login').get(controller.getOtp).post(controller.login)

  router
    .route('/adminLogin')
    .get(controller.adminGetOtp)
    .post(controller.adminLogin)
}
