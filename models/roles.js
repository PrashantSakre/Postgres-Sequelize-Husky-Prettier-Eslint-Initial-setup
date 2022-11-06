module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'roles',
    {
      role_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  return Role
}
