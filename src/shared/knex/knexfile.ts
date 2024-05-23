// const environment =  require('../../config/environment.ts')
import { knexSnakeCaseMappers } from 'objection';
import environment from '../../config/environment'

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: `mysql://root:${environment.dbPassword}@${environment.dbHost}:${environment.dbPort}/${environment.dbName}`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers()
  },

  production: {
    client: 'mysql',
    connection: environment.prodDatabaseUrl,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};