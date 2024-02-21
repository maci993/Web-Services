const mongoose = require("mongoose");

const carShema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  mileage: Number,
  price: Number,
  createdAT: {
    immutable: true,
    type: Date,
    default: () => Date.now()
},
updatedAT: {
    type: Date,
    default: () => Date.now()
}
});

const Car = mongoose.model("Semos", carShema, "cars");

const create = async (data) => {
  const car = new Car(data);
  return await car.save();
};

const getByYear = async (year) => {
  return await Car.findOne({ _id: id });
};

const getAllSortedByName = async () => {
  return await Car.find({}).sort({ make: 1 });
};

const getAll = async () => {
  return await Car.find({});
};

const update = async (id, data) => {
  return await Car.updateOne({ _id: id }, data);
};

const remove = async (year) => {
  return await Car.deleteOne({ _id: id });
};

module.exports = {
  create,
  getByYear,
  getAllSortedByName,
  getAll,
  update,
  remove,
};
