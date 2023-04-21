const config = require('./index');
require('dotenv').config()

const db = config.db;

const username = db.username;
// const username = process.env.DB_USERNAME
const password = db.password;
// const password = process.env.DB_PASSWORD
const database = db.database;
// const database = process.env.DB_DATABASE
const host = db.host;
// const host = process.env.DB_HOST

console.log('username', process.env.DB_USERNAME);
console.log('password', process.env.DB_PASSWORD);
console.log('database', process.env.DB_DATABASE);
console.log('host', host);


module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    ssl: true
    // seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    ssl: true
  },
};