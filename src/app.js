const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');

const db = require('./models');
const responseFormat = require('./utils/response');
const router = require('./routes');

const app = express();

// sync database
db.sequelize.sync();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(responseFormat);
app.use(router);

module.exports = app;
