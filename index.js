// Import the necessary modules for the Express.js and EJS setup
const express = require("express"); // Express.js framework
const app = express(); // Instance of the express application
const path = require("path"); // Path module for handling file paths
var multipart = require("connect-multiparty"); // Library for handling file uploads
const CSVToJSON = require("csvtojson"); // Library for converting CSV to JSON
const File = require("./models/fileSchema"); // File model for the file schema in MongoDB
const db = require("./config/mongoose"); // Importing the MongoDB configuration file
const utils = require("./utils/utils"); // Utility functions
var multipartMiddleware = multipart(); // Instance of the connect-multiparty middleware

// Set up the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "assets"))); // Serve static files from the assets directory
app.engine("ejs", require("ejs").renderFile); // Set the renderFile method as the EJS rendering engine

// Parse incoming request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Get request for the '/' endpoint, find all files and render the 'csv' view with their file names
app.get("/", (_req, res) => {
  File.find({}, { "data.fileName": 1 }, (_err, csvFiles) => {
    try {
      res.render("csv", { showTableData: false, csvFiles });
    } catch (err) {}
  });
});

// Post request for the '/' endpoint, use connect-multiparty to handle file uploads, convert the uploaded CSV to JSON and store it in MongoDB
app.post("/", multipartMiddleware, (req, res) => {
  CSVToJSON()
    .fromFile(req.files.csv.path)
    .then((datas) => {
      if (req.files.csv.type === "text/csv") {
        try {
          if (!utils.isNullorWhiteSpace(datas) && utils.isArray(datas)) {
            File.create({
              data: {
                fileName: req.files.csv.name,
                csvData: datas,
              },
            });
          }
        } catch (err) {
          console.error(err, "The uploaded data is not in the standard CSV format.");
        }
      }
    });
  return res.redirect("back");
});

// Get request for the '/csv-data/:fileName' endpoint, find the file in MongoDB by its name and render the 'csv' view with its data
app.get("/csv-data/:fileName", (req, res) => {
  File.findOne({ "data.fileName": req.params.fileName }, (_err, data) => {
    try {
      res.render("csv", {
        showTableData: true,
        data: data.data,
      });
    } catch (err) {
      console.error(err);
    }
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
