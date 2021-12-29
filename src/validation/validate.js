'use strict';

const { ActivityGroup } = require('../models');

exports.validateActivity = (req, res, next) => {
  // if title null
  if (!req.body.title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    });
  }

  next();
};

exports.validateTodo = async (req, res, next) => {
  // if activity_group_id null
  if (!req.body.activity_group_id) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
      data: {},
    });
  }

  // if title null
  if (!req.body.title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    });
  }

  // check if activity group id exist on database
  const activity = await ActivityGroup.findByPk(req.body.activity_group_id);

  // return 404 if not exist
  if (!activity)
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with activity_group_id ${req.body.activity_group_id} Not Found`,
      data: {},
    });

  next();
};
