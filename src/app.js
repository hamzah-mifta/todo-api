'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

// import routes
const activityGroupRoute = require('./routes/activityGroup');
const todoItemRoute = require('./routes/todoItem');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// sync database
const initDatabase = require('./utils/database');
initDatabase();

// routes
app.use('/activity-groups', activityGroupRoute);
app.use('/todo-items', todoItemRoute);

module.exports = app;
