const controller = require('../controllers/users')
const { validateToken, validateAdminUser } = require('../utils')

module.exports = router => {
  router
    .route('/users')
    .post(validateToken, validateAdminUser, controller.addAdmin)
    .get(validateToken, validateAdminUser, controller.getAllAdmin)
}
