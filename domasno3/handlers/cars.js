const {
addCar,
remove,
update,
getAll,
getOne,
} = require("../pkg/cars/mongo");

const { getAllLocalCars } = require("../pkg/cars");

const {
    validateCar,
    CarValidate,
    CarValidateOnUpdate,
} = require("../pkg/cars/validate")

const getAllCars = async (req, res) => {
    try {
      const cars = await getAll();
      return res.status(200).send(cars);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };

  const getOneCar = async (req, res) => {
    try {
      const car = await getOne(req.params.id);
      return res.status(200).send(car);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  }; 

  const create = async (req, res) => {
    try {
      await validateCar(req.body, CarValidate);
      const newCar = await addCar(req.body);
      return res.status(200).send(newCar);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };

  const updateCar = async (req, res) => {
    try {
      await validateCar(req.body, CarValidateOnUpdate);
      const newCar = await update(req.params.id, req.body);
      return res.status(200).send(newCar);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };

  const removeCar = async (req, res) => {
    try {
      await remove(req.params.id);
      return res.status(200).send("Car deleted successfully!");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };

  module.exports = {
    getAllCars,
    getOneCar,
    create,
    updateCar,
    removeCar,
  };



