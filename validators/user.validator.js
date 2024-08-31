const yup = require("yup");
const { validator } = require("../helper/validator");

const findByHomeValidation = async (req, res, next) => {
  const schema = yup.object({
    query: yup.object({
      address: yup.string().required().label("address"),
    }),
  });
  validator(req, res, schema, next);
};

module.exports = {
  findByHomeValidation,
};
