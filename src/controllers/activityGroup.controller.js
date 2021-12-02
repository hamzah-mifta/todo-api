'use strict';
const { ActivityGroup } = require('../models');
const { TodoItem } = require('../models');
const { recordNotFound } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    // insert ke database
    const activity = await ActivityGroup.create(req.body);

    // response structure
    const response = {
      created_at: activity.created_at,
      updated_at: activity.updated_at,
      id: activity.id,
      title: activity.title,
      email: activity.email,
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const whereStatement = {}; // variable untuk menampung query params

    // check jika ada query params di URL, jika ada tampung ke whereStatement
    if (req.query.email)
      whereStatement.email = decodeURIComponent(req.query.email);

    // search activity groups in database
    const activities = await ActivityGroup.findAll({
      attributes: ['id', 'title', 'created_at'],
      where: whereStatement,
      offset: 0,
      limit: 1000,
      order: [['created_at', 'DESC']],
    });

    // response structure
    const response = {
      total: activities.length,
      limit: 1000,
      skip: 0,
      data: activities,
    };

    return res.json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.findOne = async (req, res) => {
  try {
    // search activity group from database by id
    const activity = await ActivityGroup.findByPk(req.params.id, {
      attributes: ['id', 'title', 'created_at'],
      include: {
        // include todo item yang punya activity group id sama
        model: TodoItem,
        as: 'todo_items',
        attributes: [
          'id',
          'title',
          'activity_group_id',
          'is_active',
          'priority',
        ],
      },
    });

    // return 404 if activity group not found
    if (!activity) return res.status(404).json(recordNotFound(req.params.id));

    return res.json(activity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    // cari activity group yang akan diupdate
    const activity = await ActivityGroup.findByPk(req.params.id);

    // return 404 if activity group not found
    if (!activity) return res.status(404).json(recordNotFound(req.params.id));

    // update activity data based on request body
    Object.keys(req.body).forEach((key) => (activity[key] = req.body[key]));

    // save updated activity group
    await activity.save();

    // response structure
    const response = {
      id: activity.id,
      title: activity.title,
      created_at: activity.created_at,
      updated_at: activity.updated_at,
      email: activity.email,
    };

    return res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    // find activity group to delete
    const activity = await ActivityGroup.findByPk(req.params.id);

    // return 404 if activity not found
    if (!activity) return res.status(404).json(recordNotFound(req.params.id));

    // delete from database based params id
    await activity.destroy();

    return res.json({});
  } catch (error) {
    return res.status(400).json(error);
  }
};
