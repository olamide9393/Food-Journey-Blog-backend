const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    console.log(uri);
    await mongoose.connect(uri);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
       

module.exports = connectDB;
