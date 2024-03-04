const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    color: String,
    mileage: Number,
    price: Number,
});


const Car = mongoose.model("Car", carSchema, "cars");

const addCar = async (car) => {
    const newCar = new Car(car);
    return await newCar.save();
  };
  
  //remove car
  const remove = async (id) => {
    return await Car.deleteOne({ _id: id });
  };
  
  //update car
  const update = async (id, car) => {
    return await Car.updateOne({ _id: id }, car);
  };
  
  //get all cars
  const getAll = async () => {
    return await Car.find({});
  };
  
  //get one car
  const getOne = async (id) => {
    return await Car.find({ _id: id });
  };

  module.exports = {
    addCar,
    remove,
    update,
    getAll,
    getOne,
  };