const {
    addCar,
    updateCar,
    removeCar,
    getAllLocalCars,
    getCarByIndex,
} = require("../pkg/cars/index");

const {
    validateLocalCars,
    localCarsValidator,
    updateLocalCarsValidator,
} = require("../pkg/cars/validateLocalCars");

async function createLocalCars(req, res) {
    try {
        await validateLocalCars(req.body, localCarsValidator);
    const cars = await addCar(req.body);
res.status(200).send(cars);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

async function deleteLocalCar(req, res) {
    try {
await removeCar(req.params.index);
res.status(201).send("Car deleted!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

async function updateLocalCar(req, res) {
    try {
        validateLocalCars(req.body, updateLocalCarsValidator);
        await updateCar(req.params.index, req.body);
        res.status(201).send("Car updated");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

async function allLocalCars(req, res) {
    try {
        const allCars = await getAllLocalCars();
        res.status(200).send(allCars);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

async function carByIndex(req, res) {
    try {
        const car = await getCarByIndex(req.params.index);
        res.status(200).send(car);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createLocalCars,
    deleteLocalCar,
    updateLocalCar,
    allLocalCars,
    carByIndex,
};