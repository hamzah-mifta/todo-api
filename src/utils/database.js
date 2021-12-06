const mysql = require('mysql2/promise');
const db = require('../models');
const config = require('../config/config');

const initDatabase = async function () {
  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`
  );

  await connection.end();

  await db.sequelize.sync();
};

module.exports = initDatabase;
