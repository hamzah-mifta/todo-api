'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let todoItemSeed = [];

    // create 1k todo items seed
    for (let i = 0; i < 1000; i++) {
      todoItemSeed.push({
        title: 'New Todo',
        activity_group_id: Math.floor(Math.random() * 1000),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert('todo_items', todoItemSeed);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('activity_groups', null, {});
  },
};
