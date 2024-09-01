const { sequelize } = require("../models");
const { homeService, userService } = require("../services");
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
    const { updateUsers, home_id } = req.body;

    const existingUsersForHome = (
      await userService.getUsersByHome(home_id, transaction)
    ).map((users) => users.dataValues.user_id);

    const removeUsers = updateUsers.filter((user) =>
      existingUsersForHome.includes(user)
    );

    const addUsers = updateUsers.filter(
      (user) => !existingUsersForHome.includes(user)
    );

    await homeService.removeUsersForHome(removeUsers, home_id, transaction);

    await homeService.addUsersForHome(addUsers, home_id, transaction);

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
