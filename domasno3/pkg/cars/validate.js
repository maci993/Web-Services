const { Validator } = require("node-input-validator");

const CarValidate = {
    make: "required|string",
    model: "required|string",
    year: "required|integer",
    color: "required|string",
    mileage: "required|integer",
    price: "required|integer",
};

const CarValidateOnUpdate = {
    make: "string",
    model: "string",
    year: "integer",
    color: "string",
    mileage: "integer",
    price: "integer",
};


const validateCar = async (data, schema) => {
    let v = new Validator(data, schema); 
    let e = await v.check();
    if (!e) {
      throw v.errors;
    }
  };

  module.exports = {
    CarValidate,
    CarValidateOnUpdate,
    validateCar,
  };
  