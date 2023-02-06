const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
// The password is stored in an environment variable and is retrieved from process.env
mongoose.connect(`mongodb+srv://iamvishal:${process.env.PASSWORD}@coding-ninja.8inm1ya.mongodb.net/test`, () => {
  // After a successful connection, log a message to the console to indicate a successful connection to MongoDB.
  console.log("Connected to MongoDB");
});
