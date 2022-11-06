const Sequelize = require('sequelize')
const config = require('../config')[process.env.NODE_ENV || 'development']

const log = config.log()

const sequelize = new Sequelize(
  config.postgres.options.db,
  config.postgres.user,
  config.postgres.password,
  config.postgres.options
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users')(sequelize, Sequelize)
db.roles = require('./roles')(sequelize, Sequelize)

// User association with role
db.users.hasOne(db.roles, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
})
db.roles.belongsTo(db.users)

function connectToPostgres() {
  sequelize
    .authenticate()
    .then(() => {
      log.info('Connection has been established successfully.')
    })
    .catch(error => {
      log.error('Unable to connect to the database:', error)
      process.exit(1)
    })
}

connectToPostgres()

db.sequelize
  .sync({ alert: true })
  .then(() => {
    log.info('Alter Synced db.')
  })
  .catch(err => {
    log.error(`Failed to sync db: ${err.message}`)
  })

module.exports = db
