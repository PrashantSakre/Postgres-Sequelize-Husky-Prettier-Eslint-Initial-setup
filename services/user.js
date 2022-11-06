const { Op } = require('sequelize')

const db = require('../models')

const User = db.users
// const Role = db.roles

exports.getAllUsers = async () => {
  return User.findAll({
    attributes: ['id', 'name', 'email', 'mobileNo'],
    limit: 50,
  })
}

exports.findByMobile = async number => {
  return User.findOne({
    where: {
      mobileNo: number,
    },
    attributes: ['id', 'name', 'mobileNo'],
  })
}

exports.findUser = async (number, email) => {
  return User.findOne({
    where: {
      [Op.or]: {
        mobileNo: number,
        email,
      },
    },
    attributes: ['id', 'name', 'mobileNo'],
  })
}

exports.creteUser = async user => {
  return User.create(user, {
    attributes: ['id', 'name', 'email', 'mobileNo'],
  })
}

exports.dropUser = async user => {
  return User.destroy({
    where: {
      mobileNo: user.mobileNo,
    },
    attributes: ['role', 'userId'],
  })
}
