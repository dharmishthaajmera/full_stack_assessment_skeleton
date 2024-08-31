const yup = require("yup");
const { validator } = require("../helper/validator");

const findByHomeValidation = async (req, res, next) => {
  const schema = yup.object({
    query: yup.object({
      home_id: yup.number().required().label("home id"),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  findByHomeValidation,
};
