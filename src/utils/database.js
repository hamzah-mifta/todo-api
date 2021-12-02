const mysql = require('mysql2/promise');
const db = require('../models');
const config = require('../config/config');

const initDatabase = async function () {
  const connection = mysql
    .createConnection({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
    })
    .then((conn) => {
      conn.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`);
      conn.end();
    });

  const syncTable = db.sequelize.sync({ force: true });

  await Promise.all([connection, syncTable]);
};

module.exports = initDatabase;
