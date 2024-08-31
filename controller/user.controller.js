const { userService } = require("../services");
const { commonErrorHandler } = require("../helper/error-handler");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    req.data = allUsers;
    next();
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const findUsersByHome = async (req, res, next) => {
  try {
    const { address } = req.query;

    const usersByHome = await userService.getUsersByHome(address);
    req.data = usersByHome;
    next();
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  getAllUsers,
  findUsersByHome,
};
