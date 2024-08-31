"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class home extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user_home_relation, {
        foreignKey: "street_address",
        as: "user_home_relations",
      });
      // define association here
    }
  }
  home.init(
    {
      street_address: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      state: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      sqft: {
        type: Sequelize.FLOAT,
      },
      beds: {
        type: Sequelize.INTEGER,
      },
      baths: {
        type: Sequelize.INTEGER,
      },
      list_price: {
        type: Sequelize.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "home",
      tableName: "home",
      createdAt: false,
      updatedAt: false,
    }
  );
  return home;
};
