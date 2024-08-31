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

const getUsersByHome = async (address) => {
  try {
    const allUsers = await model.user_home_relation.findAll({
      where: {
        street_address: address,
      },
      attributes: ["username"],
    });

    return allUsers;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users for home");
  }
};
module.exports = { getAllUsers, getUsersByHome };
