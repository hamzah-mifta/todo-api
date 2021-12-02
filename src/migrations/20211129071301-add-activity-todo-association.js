'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.addColumn(
      'todo_items', // name of Source model
      'activity_group_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'activity_groups', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.removeColumn(
      'todo_items', // name of Source model
      'activity_group_id' // key we want to remove
    );
  },
};
