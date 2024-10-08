"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user_home_relation, {
        foreignKey: "user_id",
        as: "user_home_relation",
      });
      // define association here
    }
  }
  user.init(
    {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "user",
      createdAt: false,
      updatedAt: false,
    }
  );
  return user;
};
