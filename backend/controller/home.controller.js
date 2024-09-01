const { sequelize } = require("../models");
const { homeService } = require("../services");
const { commonErrorHandler } = require("../helper/error-handler");

const findHomeByUser = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const page = req.query.page ? req.query.page - 1 : 0;
    const limit = 50;

    const usersByHome = await homeService.getHomeByUser(user_id, page, limit);

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
    const { removedUsers, home_id } = req.body;

    await homeService.updateUsersForHome(removedUsers, home_id);

    req.statusCode = 200;
    req.data = {
      home_id,
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
