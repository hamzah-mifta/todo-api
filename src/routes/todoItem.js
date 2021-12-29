const express = require('express');

const router = express.Router();

const todoItemController = require('../controllers/todoItem.controller');
const { validateTodo } = require('../validation/validate');

router.get('/', todoItemController.findAll);
router.get('/:id', todoItemController.findOne);
router.post('/', validateTodo, todoItemController.create);
router.patch('/:id', todoItemController.update);
router.delete('/:id', todoItemController.delete);

module.exports = router;
