const { customException } = require("../helper/error-handler");
const model = require("../models");

const getHomeByUser = async (username) => {
  try {
    const allHomes = await model.home.findAll({
      include: {
        model: model.user_home_relation,
        as: "user_home_relations",
        attributes: [],
        where: {
          username,
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
    });
    return allHomes;
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users for home");
  }
};

const updateUsersForHome = async (homeAddress, removedUsers) => {
  try {
    await model.user_home_relation.destroy({
      where: {
        username: removedUsers,
        street_address: homeAddress,
      },
    });
  } catch (error) {
    console.log(error);
    throw customException("Error getting all users for home");
  }
};

module.exports = { getHomeByUser, updateUsersForHome };
