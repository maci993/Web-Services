const mongoose = require("mongoose");
const { getSection } = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = getSection("development");
console.log(MONGO_USERNAME)
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.6ic7awf.mongodb.net/Semos?retryWrites=true&w=majority&appName=Cluster0`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected!");
  } catch (err) {
    console.error(err.message);
  }
};

connect();