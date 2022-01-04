require('dotenv').config();

const config = {
  port: process.env.PORT,
  db: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
  },
};

module.exports = config;
