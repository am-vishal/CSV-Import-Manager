const mongoose = require("mongoose");
require('dotenv').config()

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://iamvishal:${process.env.PASSWORD}@coding-ninja.8inm1ya.mongodb.net/test`, () => {
  console.log("Connected to MongoDB");
});
