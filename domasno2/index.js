const express = require("express");

const {
    getAllCars,
    getAllSorted,
    getCarsByYear,
    createCar,
    updateCar,
    removeCar,
} = require("./controllers/cars");

require("./db/config");

const app = express();

// app.use(express.json());

app.get("/cars", getAllCars);
app.get("/cars/sorted", getAllSorted);
app.get("/cars/:year", getCarsByYear);
app.post("/cars", createCar);
app.put("/cars/:year", updateCar);
app.delete("/cars/:year", removeCar);

const port = 3000;

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});