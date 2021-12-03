const { TodoItem } = require('../models');
const { recordNotFound, responseSuccess } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    // insert ke database
    const todoItem = await TodoItem.create(req.body);

    return res.status(201).json(
      responseSuccess({
        created_at: todoItem.created_at,
        updated_at: todoItem.updated_at,
        id: todoItem.id,
        title: todoItem.title,
        activity_group_id: todoItem.activity_group_id,
        is_active: todoItem.is_active,
        priority: todoItem.priority,
      })
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const whereStatement = {}; // variable untuk menampung query params

    // check jika ada request query activity group id, jika ada tampung ke whereStatement
    if (req.query.activity_group_id)
      whereStatement.activity_group_id = req.query.activity_group_id;

    // search todo items in database
    const todoItems = await TodoItem.findAll({ where: whereStatement });

    return res.json(responseSuccess(todoItems));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.findOne = async (req, res) => {
  try {
    // search todo item from database by id
    const todoItem = await TodoItem.findByPk(req.params.id);

    // return 404 if todo item not found
    if (!todoItem)
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.id} Not Found`,
        data: {},
      });

    return res.json(responseSuccess(todoItem));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    // cari todo item yang akan diupdate
    const todoItem = await TodoItem.findByPk(req.params.id);

    // return 404 if todo item not found
    if (!todoItem) return res.status(404).json(recordNotFound(req.params.id));

    // update todo item data based on request body
    Object.keys(req.body).forEach((key) => (todoItem[key] = req.body[key]));

    // save updated todo item
    await todoItem.save();

    return res.json(responseSuccess(todoItem));
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    // if no query given
    const todoItem = await TodoItem.findByPk(req.params.id);

    // return 404 if todo item not found
    if (!todoItem)
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.id} Not Found`,
        data: {},
      });

    // delete todo from database
    await todoItem.destroy();

    return res.json(responseSuccess({}));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
