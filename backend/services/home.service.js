const { customException } = require("../helper/error-handler");
const model = require("../models");

const getHomeByUser = async (user_id, page, limit) => {
  try {
    const allHomes = await model.home.findAll({
      include: {
        model: model.user_home_relation,
        as: "home_user_relation",
        attributes: [],
        where: {
          user_id,
        },
      },
      attributes: [
        "street_address",
        "state",
        "zip",
        "sqft",
        "beds",
        "baths",
        "list_price",
      ],
      limit,
      offset: page * limit,
    });

    return allHomes;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all homes for user");
  }
};

const removeUsersForHome = async (
  removedUsers,
  home_id,
  transaction = null
) => {
  try {
    await model.user_home_relation.destroy(
      {
        where: {
          user_id: removedUsers,
          home_id,
        },
      },
      { transaction }
    );
  } catch (error) {
    console.log(error);
    throw customException("Error removing users for home");
  }
};

const addUsersForHome = async (addUsers, home_id, transaction = null) => {
  try {
    await model.user_home_relation.bulkCreate(
      addUsers.map((user_id) => ({
        home_id,
        user_id,
      })),
      { transaction }
    );
  } catch (error) {
    console.log(error);
    throw customException("Error adding users for home");
  }
};

module.exports = { getHomeByUser, removeUsersForHome, addUsersForHome };
