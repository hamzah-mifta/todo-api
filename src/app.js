'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// import routes
const activityGroupRoute = require('./routes/activityGroup');
const todoItemRoute = require('./routes/todoItem');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.send({ message: 'OK' }));
app.use('/activity-groups', activityGroupRoute);
app.use('/todo-items', todoItemRoute);

module.exports = app;
