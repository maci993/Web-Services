const express = require("express");
require("./pkg/db");

const {
  getAllCars,
  getOneCar,
  create,
  updateCar,
  removeCar,
} = require("./handlers/cars");

const {
  createLocalCars,
  deleteLocalCar,
  updateLocalCar,
  allLocalCars,
  carByIndex,
} = require("./handlers/localCars");
const api = express();
api.use(express.json());

api.get("/app/cars", getAllCars);
api.get("app/cars/:id", getOneCar);
api.post("/app/cars", create);
api.put("/app/cars:id", updateCar);
api.delete("/app/cars/:id", removeCar);
api.post("/local/cars", createLocalCars);
api.put("/local/cars/:index", updateLocalCar);
api.delete("/local/cars/:index", deleteLocalCar);
api.get("/local/cars", allLocalCars);
api.get("/local/cars/:index", carByIndex);

api.listen(10000, (err) => {
  err ? console.log(err) : console.log("Server started at port 10000");
});
