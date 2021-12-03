'use strict';
const { ActivityGroup } = require('../models');
const { activityNotFound, responseSuccess } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { title, email } = req.body;

    // insert ke database
    const activity = await ActivityGroup.create({ title, email });

    // response structure, should encrypt email
    const response = {
      created_at: activity.created_at,
      updated_at: activity.updated_at,
      id: activity.id,
      title: activity.title,
      email: activity.email,
    };

    return res.status(201).json(responseSuccess(response));
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    // search activity groups in database
    const activities = await ActivityGroup.findAll({});

    return res.json(responseSuccess(activities));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.findOne = async (req, res) => {
  try {
    // search activity group from database by id
    const activity = await ActivityGroup.findByPk(req.params.id);

    // return 404 if activity group not found
    if (!activity) return res.status(404).json(activityNotFound(req.params.id));

    return res.json(responseSuccess(activity));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    // cari activity group yang akan diupdate
    const activity = await ActivityGroup.findByPk(req.params.id);

    // return 404 if activity group not found
    if (!activity) return res.status(404).json(activityNotFound(req.params.id));

    // update activity data based on request body
    Object.keys(req.body).forEach((key) => (activity[key] = req.body[key]));

    // save updated activity group
    await activity.save();

    return res.json(responseSuccess(activity));
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    // find activity group to delete
    const activity = await ActivityGroup.findByPk(req.params.id);

    // return 404 if activity not found
    if (!activity) return res.status(404).json(activityNotFound(req.params.id));

    // delete from database based params id
    await activity.destroy();

    return res.json(responseSuccess({}));
  } catch (error) {
    return res.status(400).json(error);
  }
};
