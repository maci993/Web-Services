const { readData, writeData } = require("../files");


const addCar = async (car) => {};

const removeCar = async (index) => {};

const updateCar = async (index, car) => {};

const getAllLocalCars = async () => {
    return await readData();
  };

  const getCarByIndex = async (index) => {};

  module.exports = {
    addCar,
    removeCar,
    updateCar,
    getAllLocalCars,
    getCarByIndex,
  };