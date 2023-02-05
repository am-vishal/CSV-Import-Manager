// Express.js and EJS setup
const express = require("express"); // Importing the express framework
const app = express(); // Creating an instance of express application
const path = require("path"); // Importing the path module for handling file paths
var multipart = require("connect-multiparty"); // Importing the connect-multiparty library for handling file uploads
const CSVToJSON = require("csvtojson"); // Importing the csvtojson library for converting CSV to JSON
const File = require("./models/fileSchema"); // Importing the File model that defines the file schema in MongoDB
const db = require("./config/mongoose");
var multipartMiddleware = multipart(); // Instantiating the connect-multiparty middleware

app.set("views", path.join(__dirname, "views")); // Setting the path for views directory
app.set("view engine", "ejs"); // Setting the view engine as ejs
app.use(express.static(path.join(__dirname, "assets"))); // Serve static files from the public directory
app.engine("ejs", require("ejs").renderFile); // Setting the renderFile method as the rendering engine for ejs files

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  File.find({}, { "data.fileName": 1 }, (_err, csvFiles) => {
    try {
      res.render("csv", { showTableData: false, csvFiles });
    } catch (err) {}
  });
});

app.post("/", multipartMiddleware, (req, res) => {
  CSVToJSON()
    .fromFile(req.files.csv.path)
    .then((datas) => {
      File.create({
        data: {
          fileName: req.files.csv.name,
          csvData: datas,
        },
      });
    });
  return res.redirect("back");
});

app.get("/csv-data/:fileName", (req, res) => {
  File.findOne({ "data.fileName": req.params.fileName }, (_err, data) => {
    try {
      console.log(data);
      // file is the found object with the matching fileName
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
