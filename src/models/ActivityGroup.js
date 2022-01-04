const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // activity group has many todo item
      this.hasMany(models.Todos, {
        foreignKey: 'activity_group_id',
        as: 'todo_items',
      });
    }
  }
  Activities.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Activities',

      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
  return Activities;
};
