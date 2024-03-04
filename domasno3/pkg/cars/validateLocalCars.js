const { Validator } = require("node-input-validator");

const localCarsValidator = {
    make: "required|string",
    model: "required|string",
    year: "required|integer",
    color: "required|string",
    mileage: "required|integer",
    price: "required|integer",
};

const updateLocalCarsValidator = {
    make: "string",
    model: "string",
    year: "integer",
    color: "string",
    mileage: "integer",
    price: "integer",
};

async function validateLocalCars(data, schema) {
    let v = new Validator(data, schema);
    console.log("v", v);
    let e = await v.check();
    console.log("error", v.errors);
    if (!e) {
      throw v.errors;
    }
};

module.exports = {
    localCarsValidator,
    updateLocalCarsValidator,
    validateLocalCars,
};
