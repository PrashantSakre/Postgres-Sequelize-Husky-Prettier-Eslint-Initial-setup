const jwt = require('jsonwebtoken')

const { User, Role } = require('../services')

module.exports = {
  addAdmin: (req, res) => {
    // Validate request
    const { name, mobileNo } = req.body
    if (!name || !mobileNo) {
      return res.status(400).send({
        message: 'Content can not be empty!',
      })
    }
    // Create a Tutorial
    const user = {
      name,
      mobileNo,
    }
    // Save Tutorial in the database
    User.creteUser(user)
      .then(data => {
        Role.createRole({ role: 'admin', userId: data.id })
          .then(roleData => {
            res.send(
              JSON.stringify({
                user: data,
                role: roleData,
                token: jwt.sign(user, process.env.JWT_SECRET),
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
    return 1
  },
  getAllAdmin: (req, res) => {
    User.getAllUsers()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Users.',
        })
      })
  },
}
