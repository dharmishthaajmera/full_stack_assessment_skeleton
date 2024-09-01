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
    throw customException("Error getting all users for home");
  }
};

const updateUsersForHome = async (removedUsers, home_id) => {
  try {
    await model.user_home_relation.destroy({
      where: {
        user_id: removedUsers,
        home_id,
      },
    });
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users for home");
  }
};

module.exports = { getHomeByUser, updateUsersForHome };
