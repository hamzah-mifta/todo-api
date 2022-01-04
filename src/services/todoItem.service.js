const { Todos } = require('../models');

async function create(data) {
  const result = Todos.create(data);

  return result;
}

async function findAll(options = {}, offset = 0, limit = 10) {
  const result = await Todos.findAll({
    ...options,
    offset,
    limit,
  });

  return result;
}

async function findById(id) {
  const result = await Todos.findByPk(id);

  return result;
}

async function updateById(id, data) {
  const result = await Todos.update(data, {
    where: {
      id,
    },
  });

  return result;
}

async function deleteById(id) {
  const result = await Todos.destroy({
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
