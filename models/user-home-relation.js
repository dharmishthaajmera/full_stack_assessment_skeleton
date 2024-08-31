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
        foreignKey: "username",
        targetKey: "username",
        as: "user_fk",
        onDelete: "cascade",
      }),
        this.belongsTo(models.home, {
          foreignKey: "street_address",
          targetKey: "street_address",
          as: "home_fk",
          onDelete: "cascade",
        });
      // define association here
    }
  }
  user_home_relation.init(
    {
      username: {
        type: Sequelize.STRING,
        references: {
          model: "user",
          key: "username",
        },
      },
      street_address: {
        type: Sequelize.STRING,
        references: {
          model: "home",
          key: "street_address",
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
