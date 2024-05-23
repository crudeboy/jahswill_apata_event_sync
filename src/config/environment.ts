import path from "path";

const envPath = path.resolve(__dirname, '../../.env');
const test = require('dotenv').config({path: envPath})
// console.log(process.env.APP_NAME) //undefined

export default {
 
  // app config
  appName: process.env.APP_NAME || "Boilerplate",
  port: process.env.PORT || "8000",
  nodeEnv: process.env.NODE_ENV || "development",
  secretKey: process.env.SECRET_KEY || "",

  // jwt config
  saltRounds: process.env.SALT_ROUNDS || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    "access_token",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    "jwtRefreshTokenSecret",

  // redis config
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: process.env.REDIS_PORT || "6379",

  // production database config
  prodDatabaseUrl: process.env.PROD_DATABASE_URL || "",
  // dbHost: process.env.DB_HOST || "db",
  // dbPort: process.env.DB_PORT || "3306",
  // dbUsername: process.env.DB_USERNAME || "root",
  // dbPassword: process.env.MYSQL_ROOT_PASSWORD || "SecuredPassword",
  // dbName: process.env.MYSQL_DATABASE || "boilerplate",

  // development database config
  devDatabase: process.env.DEV_DATABASE || "mysqlDB",
  dbHost: process.env.DB_HOST || "db",
  dbPort: process.env.DB_PORT || "3306",
  dbUsername: process.env.DB_USERNAME || "root",
  dbPassword: process.env.MYSQL_ROOT_PASSWORD || "SecuredPassword",
  dbName: process.env.MYSQL_DATABASE || "boilerplate",

  //external API parameters
  reserviourApiUrl: process.env.RESERVIOUR_API_URL || "",
  syncIntervalsMinutes: process.env.SYNC_INTERVAL_MINUTES || 5,
  tokenSyncIntervalsMinutes: process.env.TOKEN_SYNC_INTERVAL_MINUTES || 30,
};
