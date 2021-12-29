const { ActivityGroup } = require('../models');

async function create(data) {
  const result = ActivityGroup.create(data);

  return result;
}

async function findAll() {
  const result = await ActivityGroup.findAll();

  return result;
}

async function findById(id) {
  const result = await ActivityGroup.findByPk(id);

  return result;
}

async function updateById(id, data) {
  const result = await ActivityGroup.update(data, {
    where: {
      id,
    },
  });

  return result;
}

async function deleteById(id) {
  const result = await ActivityGroup.destroy({
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
