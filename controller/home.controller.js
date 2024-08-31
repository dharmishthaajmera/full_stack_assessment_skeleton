const { sequelize } = require("../models");
const { homeService } = require("../services");
const { commonErrorHandler } = require("../helper/error-handler");

const findHomeByUser = async (req, res, next) => {
  try {
    const { username } = req.query;

    const usersByHome = await homeService.getHomeByUser(username);
    req.data = usersByHome;
    next();
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const updateUsersForHome = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { removedUsers, homeAddress } = req.body;

    await homeService.updateUsersForHome(removedUsers, homeAddress);

    req.statusCode = 200;
    req.data = {
      address: homeAddress,
    };

    await transaction.commit();
    next();
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  findHomeByUser,
  updateUsersForHome,
};
