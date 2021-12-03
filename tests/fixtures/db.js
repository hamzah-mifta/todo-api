const { ActivityGroup, TodoItem } = require('../../src/models');

// make one activity for activiy group test

const activityGroupDummy = [
  {
    id: 1,
    title: 'Activity Test 1',
    email: 'hamzah+1@mail.id',
  },
  {
    id: 2,
    title: 'Activity Test 2',
    email: 'something@mail.com',
  },
  {
    id: 3,
    title: 'Activity Test 3',
    email: 'test@mail.io',
  },
];

const todoItemDummy = [
  {
    id: 1,
    title: 'To do test 1.1',
    activity_group_id: 1,
  },
  {
    id: 2,
    title: 'To do test 1.2',
    activity_group_id: 1,
  },
  {
    id: 3,
    title: 'To do test 2.1',
    activity_group_id: 2,
  },
];

const setupDatabase = async () => {
  // clear avtivity group table
  await ActivityGroup.destroy({
    where: {},
    force: true,
  });

  // clear todo item data
  await TodoItem.destroy({
    where: {},
    force: true,
  });

  // insert activity group dummy data
  await ActivityGroup.bulkCreate(activityGroupDummy);

  // insert todo item dummy data
  await TodoItem.bulkCreate(todoItemDummy);
};

module.exports = { setupDatabase };
