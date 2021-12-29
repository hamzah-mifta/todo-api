'use strict';

const config = require('./config/config');
const app = require('./app');
const db = require('./models');

const port = config.port || 3030;

// sync database
db.sequelize.sync()

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
