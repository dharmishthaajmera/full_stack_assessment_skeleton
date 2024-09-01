const { raw } = require("mysql2");
const { customException } = require("../helper/error-handler");
const model = require("../models");

const getAllUsers = async () => {
  try {
    const allUsers = await model.user.findAll();

    return allUsers;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users");
  }
};

const getUsersByHome = async (home_id) => {
  try {
    const allUsers = await model.user.findAll({
      attributes: ["username", "user_id"],
      include: {
        model: model.user_home_relation,
        as: "user_home_relation",
        where: {
          home_id,
        },
        attributes: [],
      },
    });

    return allUsers;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users for home");
  }
};
module.exports = { getAllUsers, getUsersByHome };
