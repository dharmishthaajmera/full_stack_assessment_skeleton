const yup = require("yup");
const { validator } = require("../helper/validator");

const findByUserValidation = async (req, res, next) => {
  const schema = yup.object({
    query: yup.object({
      user_id: yup.number().required().label("user id"),
      page: yup.number().label("page"),
    }),
  });
  validator(req, res, schema, next);
};

const updateUsersForHomeValidation = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      home_id: yup.number().label("home id"),
      updateUsers: yup
        .array()
        .of(yup.number().label("user_id"))
        .min(1)
        .required()
        .label("update users"),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  findByUserValidation,
  updateUsersForHomeValidation,
};
