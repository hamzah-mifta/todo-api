'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./models');

// import routes
const activityGroupRoute = require('./routes/activityGroup');
const todoItemRoute = require('./routes/todoItem');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// sync database
db.sequelize.sync()

// routes
app.use('/activity-groups', activityGroupRoute);
app.use('/todo-items', todoItemRoute);

module.exports = app;
