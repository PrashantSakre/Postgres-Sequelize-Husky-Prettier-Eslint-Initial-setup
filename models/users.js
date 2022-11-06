module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      unique: true,
    },
    mobileNo: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  })

  return User
}
