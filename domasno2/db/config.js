const mongoose = require("mongoose");

const uri = `mongodb+srv://savicmarina993:macencedoll993@cluster0.6ic7awf.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Mongo connected!");
  } catch (err) {
    console.log(err.message);
  }
}

connect();
