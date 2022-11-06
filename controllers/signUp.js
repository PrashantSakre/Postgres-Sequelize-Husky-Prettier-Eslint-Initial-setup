const jwt = require('jsonwebtoken')

const { User, Role } = require('../services')

module.exports = {
  signUp: async (req, res) => {
    const { name, mobileNo, email = '' } = req.body
    User.findUser(mobileNo, email)
      .then(user => {
        if (user == null) {
          // Validate request
          if (!name || !mobileNo) {
            return res.status(400).send({
              message: 'Content can not be empty!',
            })
          }
          // Create a Tutorial
          const userValues = {
            name,
            email,
            mobileNo,
          }
          // Save Tutorial in the database
          User.creteUser(userValues)
            .then(data => {
              Role.createRole({ role: 'trainee', userId: data.id })
                .then(() => {
                  res.send(
                    JSON.stringify({
                      user: data,
                      token: jwt.sign(userValues, process.env.JWT_SECRET),
                    })
                  )
                })
                .catch(errRole => {
                  res.status(500).send({
                    message:
                      errRole.message ||
                      'Some error occurred while associating the Role',
                  })
                })
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || 'Some error occurred while creating the User.',
              })
            })
        } else {
          res.status(404).send({
            message: 'User already exists',
          })
        }
        return 1
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while SignUp.',
        })
      })
  },
}
