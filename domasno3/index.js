const express = require("express");
require("./pkg/db");

const {
getAllCars,
getOneCar,
create,
updateCar,
removeCar,
} = require("./handlers/cars")

const app = express();
app.use(express.json());

app.get("/app/cars", getAllCars);
app.get("app/cars/:id", getOneCar);
app.post("app/cars", create);
app.put("/app/cars:id", updateCar);
app.delete("/app/cars/:id", removeCar);

app.listen(10000, (err) =>{
    err ? console.log(err) : console.log("Server started at port 10000");
});