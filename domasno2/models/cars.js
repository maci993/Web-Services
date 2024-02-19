const mongoose = require("mongoose");

const carShema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  mileage: Number,
  price: Number,
});

const Car = mongoose.model("Semos", carShema, "cars");

const create = async (data) => {
  const car = new Car(data);
  return await car.save();
};

const getByYear = async (year) => {
  return await Car.findOne({ _year: year });
};

const getAllSortedByName = async () => {
  return await Car.find({}).sort({ make: 1 });
};

const getAll = async () => {
  return await Car.find({});
};

const update = async (year, data) => {
  return await Car.updateOne({ _year: year }, data);
};

const remove = async (year) => {
  return await Car.deleteOne({ _year: year });
};

module.exports = {
  create,
  getByYear,
  getAllSortedByName,
  getAll,
  update,
  remove,
};
