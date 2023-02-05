const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    data: {
      fileName: String,
      csvData: Array,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;
