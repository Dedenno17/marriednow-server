const asyncHandler = require("express-async-handler");
const UploadImage = require("../models/UploadImage");

// UPLOAD IMAGE
const uploadImage = asyncHandler(async (req, res) => {
  // create object image
  const newImage = { file: req.file.filename };
  const image = await UploadImage.create(newImage);

  if (image) {
    res.status(201).json({ message: "Image Successfully Uploaded" });
  } else {
    res.status(401).json({ message: "Image Failed to Upload" });
  }
});

module.exports = { uploadImage };
