const yup = require("yup");
const { validator } = require("../helper/validator");

const findByUserValidation = async (req, res, next) => {
  const schema = yup.object({
    query: yup.object({
      username: yup.string().required().label("username"),
    }),
  });
  validator(req, res, schema, next);
};

const updateUsersForHomeValidation = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      homeAddress: yup.string().required().label("home address"),
      removedUsers: yup
        .array()
        .of(yup.string())
        .min(1)
        .required()
        .label("removed users"),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  findByUserValidation,
  updateUsersForHomeValidation,
};
