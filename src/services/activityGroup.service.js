const { Activities } = require('../models');

async function create(data) {
  const result = Activities.create(data);

  return result;
}

async function findAll(options = {}, limit = 10, offset = 0) {
  const result = await Activities.findAll({
    ...options,
    limit,
    offset,
  });

  return result;
}

async function findById(id) {
  const result = await Activities.findByPk(id);

  return result;
}

async function updateById(id, data) {
  const result = await Activities.update(data, {
    where: {
      id,
    },
  });

  return result;
}

async function deleteById(id) {
  const result = await Activities.destroy({
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
