const mongoose = require("mongoose");

const UploadImageSchema = new mongoose.Schema(
  {
    file: { type: String },
  },
  { timestamps: true }
);

const UploadImage = mongoose.model("UploadImage", UploadImageSchema);
module.exports = UploadImage;
