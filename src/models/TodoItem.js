const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ActivityGroup, {
        foreignKey: 'activity_group_id',
        allowNull: false,
      });
    }
  }
  TodoItem.init(
    {
      activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'very-high',
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'TodoItem',

      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    }
  );
  return TodoItem;
};
