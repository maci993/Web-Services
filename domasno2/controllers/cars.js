const {
  create,
  getByYear,
  getAllSortedByName,
  getAll,
  update,
  remove,
} = require("../models/cars");

const getAllCars = async (req, res) => {
  try {
    const cars = await getAll();
    res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const getAllSorted = async (req, res) => {
  try {
    const sortedCars = await getAllSortedByName();
    res.status(200).send(sortedCars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const getCarsByYear = async (req, res) => {
  try {
    const car = await getByYear(req.params.year);
    res.status(200).send(car);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const createCar = async (req, res) => {
  try {
    await create(req.body);
    res.status(201).send("Car created!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const updateCar = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    res.status(204).send(`Car updated: ${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const removeCar = async (req, res) => {
  try {
    await remove(req.params.id);
    res.status(204).send(`Car deleted: ${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllCars,
  getAllSorted,
  getCarsByYear,
  createCar,
  updateCar,
  removeCar,
};
