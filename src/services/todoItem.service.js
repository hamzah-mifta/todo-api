const { TodoItem } = require('../models');

async function create(data) {
  const result = TodoItem.create(data);

  return result;
}

async function findAll(options = {}) {
  const result = await TodoItem.findAll({ ...options });

  return result;
}

async function findById(id) {
  const result = await TodoItem.findByPk(id);

  return result;
}

async function updateById(id, data) {
  const result = await TodoItem.update(data, {
    where: {
      id,
    },
  });

  return result;
}

async function deleteById(id) {
  const result = await TodoItem.destroy({
    where: {
      id,
    },
  });

  return result;
}

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};
