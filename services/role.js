const db = require('../models')

const Role = db.roles

exports.createRole = async role => {
  return Role.create(role)
}

exports.getUserRole = async userId => {
  return Role.findOne({ where: { userId } })
}
