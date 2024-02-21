const express = require("express");

const {
    getAllCars,
    getAllSorted,
    getCarsById,
    createCar,
    updateCar,
    removeCar,
} = require("./controllers/cars");

require("./db/config");

const app = express();

// app.use(express.json());

app.get("/cars", getAllCars);
app.get("/cars/sorted", getAllSorted);
app.get("/cars/:year", getCarsById);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", removeCar);

const port = 3000;

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
