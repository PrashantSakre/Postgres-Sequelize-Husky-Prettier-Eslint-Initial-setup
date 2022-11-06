const bunyan = require('bunyan')
const pjs = require('./package.json')

const { name, version } = pjs

const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level })

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    port: process.env.NODE_PORT,
    postgres: {
      host: process.env.DB_HOST,
      user: process.env.DBUSER,
      password: process.env.PASSWORD,
      options: {
        db: process.env.DB,
        dialect: process.env.DB_DIALECT,
        pool: {
          max: parseInt(process.env.DB_POOL_MAX, 10),
          min: parseInt(process.env.DB_POOL_MIN, 10),
          acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
          idle: parseInt(process.env.DB_POOL_IDLE, 10),
        },
        logging: msg => getLogger(name, version, 'debug').info(msg),
      },
    },
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info'),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
  },
}
