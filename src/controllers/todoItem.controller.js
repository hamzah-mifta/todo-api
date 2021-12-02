const { TodoItem } = require('../models');
const { recordNotFound } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    // insert ke database
    const todoItem = await TodoItem.create(req.body);

    // response structure
    const response = {
      is_active: todoItem.is_active,
      priority: todoItem.priority,
      created_at: todoItem.created_at,
      updated_at: todoItem.updated_at,
      id: todoItem.id,
      activity_group_id: todoItem.activity_group_id,
      title: todoItem.title,
    };

    return res.status(201).json(response);
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
    const todoItems = await TodoItem.findAll({
      attributes: ['id', 'title', 'activity_group_id', 'is_active', 'priority'],
      where: whereStatement,
      offset: 0,
      limit: 10,
      order: [['created_at', 'DESC']],
    });

    // response structure
    const response = {
      total: todoItems.length,
      limit: 10,
      skip: 0,
      data: todoItems,
    };

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.findOne = async (req, res) => {
  try {
    // search todo item from database by id
    const todoItem = await TodoItem.findByPk(req.params.id, {
      attributes: ['id', 'title', 'is_active', 'priority'],
    });

    // return 404 if todo item not found
    if (!todoItem) return res.status(404).json(recordNotFound(req.params.id));

    return res.json(todoItem);
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

    return res.json(todoItem);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    // if multiple delete, use request query id and ignore params id
    if (req.query.id) {
      const ids = req.query.id.split(',').map((id) => +id);

      // delete
      await TodoItem.destroy({ where: { id: ids } });

      return res.json({});
    } else {
      // if no query given
      const todoItem = await TodoItem.findByPk(req.params.id);

      // return 404 if todo item not found
      if (!todoItem) return res.status(404).json(recordNotFound(req.params.id));

      // delete todo from database
      await todoItem.destroy();

      return res.json({});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
