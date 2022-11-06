const jwt = require('jsonwebtoken')

const { User, Role } = require('../services')

module.exports = {
  getOtp: (req, res) => {
    const { mobileNo } = req.body
    if (mobileNo) {
      User.findByMobile(mobileNo).then(user => {
        if (user == null) {
          res.status(200).send(
            JSON.stringify({
              message: "User doesn't exists. Please provide valid mobile No.",
            })
          )
        } else {
          Role.getUserRole(user.id)
            .then(role => {
              if (role.role === 'trainee') {
                res
                  .status(200)
                  .send(JSON.stringify({ otp: 'Successfully sent otp' }))
              } else {
                res
                  .status(404)
                  .send(JSON.stringify({ error: 'Not Authorized.' }))
              }
            })
            .catch(errRole => {
              res.status(404).send(
                JSON.stringify({
                  error: errRole,
                  message: 'Something went wrong.',
                })
              )
            })
        }
      })
    } else {
      res
        .status(404)
        .send(
          JSON.stringify({ message: 'Something went wrong while sending otp.' })
        )
    }
  },
  adminGetOtp: (req, res) => {
    const { mobileNo } = req.body
    if (mobileNo) {
      User.findByMobile(mobileNo)
        .then(user => {
          if (user == null) {
            res.status(200).send(
              JSON.stringify({
                message: "User doesn't exists. Please provide valid mobile No.",
              })
            )
          } else {
            Role.getUserRole(user.id)
              .then(role => {
                if (role.role === 'admin') {
                  res
                    .status(200)
                    .send(JSON.stringify({ otp: 'Successfully sent otp' }))
                } else {
                  res
                    .status(404)
                    .send(JSON.stringify({ error: 'Not Authorized.' }))
                }
              })
              .catch(errRole => {
                res.status(404).send(
                  JSON.stringify({
                    error: errRole,
                    message: 'Something went wrong.',
                  })
                )
              })
          }
        })
        .catch(errFindUser => {
          res.status(404).send(
            JSON.stringify({
              error: errFindUser,
              message: "User doesn't exists. Please provide valid mobile No.",
            })
          )
        })
    } else {
      res
        .status(404)
        .send(JSON.stringify({ message: 'Please provide a valid Mobile No.' }))
    }
  },
  login: (req, res) => {
    const { pin, mobileNo } = req.body
    if (pin === 12345) {
      User.findByMobile(mobileNo)
        .then(user => {
          Role.getUserRole(user?.dataValues?.id)
            .then(userRole => {
              if (userRole.role === 'trainee') {
                const userData = user?.dataValues
                userData.role = userRole.role
                res.send(
                  JSON.stringify({
                    user: userData,
                    token: jwt.sign(userData, process.env.JWT_SECRET, {
                      expiresIn: '60m',
                    }),
                  })
                )
              } else {
                res.status(404).send({
                  message: 'Not Authorized.',
                })
              }
            })
            .catch(userRoleErr => {
              res.status(500).send({
                message:
                  userRoleErr.message ||
                  'Some error occurred while getting role.',
              })
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Some error occurred while login.',
          })
        })
    } else {
      res.status(204).send({ message: 'User not authenticated' })
    }
  },
  adminLogin: async (req, res) => {
    const { pin, mobileNo } = req.body
    if (pin === '1234') {
      User.findByMobile(mobileNo)
        .then(user => {
          Role.getUserRole(user?.dataValues?.id)
            .then(role => {
              if (role.role === 'admin') {
                const userData = user?.dataValues
                userData.role = role.role
                res.send(
                  JSON.stringify({
                    user: userData,
                    token: jwt.sign(userData, process.env.JWT_SECRET, {
                      expiresIn: '60m',
                    }),
                  })
                )
              } else {
                res.status(404).send({
                  message: 'Not Authorized.',
                })
              }
            })
            .catch(roleErr => {
              res.status(404).send({
                message:
                  roleErr.message || 'Some error occurred while getting role.',
              })
            })
        })
        .catch(userErr => {
          res.status(404).send({
            message: userErr.message || 'Some error occurred while login.',
          })
        })
    } else {
      res.status(204).send({ message: 'User not authenticated' })
    }
  },
}
