'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

const router = require('./routes');
app.use(router)

module.exports = app;
