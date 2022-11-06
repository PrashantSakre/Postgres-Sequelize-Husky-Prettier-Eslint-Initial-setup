const jwt = require('jsonwebtoken')
const { Role, User } = require('./services')
const config = require('./config')[process.env.NODE_ENV || 'development']

const log = config.log()

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization
    let result
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1] // Bearer <token>
      try {
        result = jwt.verify(token, process.env.JWT_SECRET)
        User.findByMobile(result.mobileNo)
          .then(user => {
            if (user) {
              // Let's pass back the decoded token to the request object
              req.decoded = result
              // We call next to pass execution to the subsequent middleware
              next()
            } else {
              res.status(404).send({
                message: 'Please provide valid details.',
              })
            }
          })
          .catch(err => {
            // Throw an error just in case anything goes wrong with verification
            result = {
              error: `Unable to find User.`,
              message: err,
            }
            res.status(404).send(result)
            log.error(err.name, err.message, err.expiredAt)
          })
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        result = {
          error: `Authentication failed.`,
          message: err,
        }
        res.status(500).send(result)
        log.error(err.name, err.message, err.expiredAt)
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      }
      res.status(401).send(result)
    }
  },
  validateAdminUser: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization
    let result
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1] // Bearer <token>
      try {
        result = jwt.verify(token, process.env.JWT_SECRET)
        Role.getUserRole(result.id)
          .then(user => {
            if (user.dataValues.role === 'admin') {
              result.role = user.dataValues.role
              // Let's pass back the decoded token to the request object
              req.decoded = result
              // We call next to pass execution to the subsequent middleware
              next()
            } else {
              res.status(403).send({
                message: 'Forbidden.',
              })
            }
          })
          .catch(err => {
            // Throw an error just in case anything goes wrong with verification
            result = {
              error: `Unable to find User.`,
              message: err,
            }
            res.status(404).send(result)
            log.error(err.name, err.message, err.expiredAt)
          })
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        result = {
          error: `Authentication failed.`,
          message: err,
        }
        res.status(500).send(result)
        log.error(err.name, err.message, err.expiredAt)
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      }
      res.status(401).send(result)
    }
  },
}
