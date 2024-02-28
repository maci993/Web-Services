const mongoose = require("mongoose");
const { getSection } = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.12jzasd.mongodb.net/Semos?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected!");
  } catch (err) {
    console.error(err.message);
  }
}

connect();