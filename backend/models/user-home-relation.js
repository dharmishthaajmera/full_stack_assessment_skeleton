"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class user_home_relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "user_id",
        as: "user_fk",
        onDelete: "cascade",
      }),
        this.belongsTo(models.home, {
          foreignKey: "home_id",
          targetKey: "home_id",
          as: "home_fk",
          onDelete: "cascade",
        });
      // define association here
    }
  }
  user_home_relation.init(
    {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "user_id",
        },
      },
      home_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "home",
          key: "home_id",
        },
      },
    },
    {
      sequelize,
      modelName: "user_home_relation",
      tableName: "user_home_relation",
      createdAt: false,
      updatedAt: false,
    }
  );
  return user_home_relation;
};
