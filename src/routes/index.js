// import routes
const express = require('express');
const activityGroupRoute = require('./activityGroup');
const todoItemRoute = require('./todoItem');

const router = express.Router();

// routes
router.use('/activity-groups', activityGroupRoute);
router.use('/todo-items', todoItemRoute);

module.exports = router