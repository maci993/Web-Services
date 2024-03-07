const { Validator } = require("node-input-validator");

const Recipes = {
  recept: "required|string",
  sostojki: "required|string",
  vreme: "required|string",
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  Recipes,
  validate,
};
