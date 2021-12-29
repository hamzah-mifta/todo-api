/* eslint-disable camelcase */
const { todoItemService } = require('../services');

exports.create = async (req, res) => {
  try {
    // insert ke database
    const result = await todoItemService.create(req.body);

    return res.RESPONSE.success(result, 201);
  } catch (error) {
    return res.RESPONSE.error(400, 'Bad Request', error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const options = {};
    const { activity_group_id } = req.query;

    if (activity_group_id) options.where = { activity_group_id };

    // search todo items in database
    const result = await todoItemService.findAll({ ...options });

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.RESPONSE.error(500);
  }
};

exports.findOne = async (req, res) => {
  try {
    // search todo item from database by id
    const result = await todoItemService.findById(req.params.id);

    // return 404 if todo item not found
    if (!result) return res.RESPONSE.notFound('Todo Item', req.params.id);

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const todo = await todoItemService.findById(req.params.id);

    if (!todo) return res.RESPONSE.notFound('Todo Item', req.params.id);

    const result = await todo.update(req.body);

    return res.RESPONSE.success(result);
  } catch (error) {
    return res.RESPONSE.error(500, 'Internal Server Error', error);
  }
};

exports.delete = async (req, res) => {
  try {
    const todo = await todoItemService.findById(req.params.id);

    if (!todo) return res.RESPONSE.notFound('Todo Item', req.params.id);

    await todo.destroy;

    return res.RESPONSE.success();
  } catch (error) {
    return res.RESPONSE.error(500, 'Internal Server Error', error);
  }
};
