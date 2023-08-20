const asyncHandler = require("express-async-handler");
const Theme = require("../models/Theme");

// GET ALL THEME
const getAllTheme = asyncHandler(async (req, res) => {
  // params
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  // search theme by params
  const themes = await Theme.find({ title: { $regex: search, $options: "i" } })
    .skip(page * limit)
    .limit(limit)
    .lean();

  // if there are no theme found
  if (!themes.length) {
    return res.status(404).json({ message: "No theme found" });
  }

  // count total theme
  const total = await Theme.countDocuments();

  // response data
  const response = {
    data: themes,
    limit,
    page: page + 1,
    total,
  };

  res.status(200).json(response);
});

// CREATE THEME
const createTheme = asyncHandler(async (req, res) => {
  const { title, image, category, creator } = req.body;

  if (!title || !image || !category || !creator) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // create theme
  const objTheme = { title, image, category, creator };
  const theme = await Theme.create(objTheme);

  if (theme) {
    return res.status(201).json({ message: "New Theme successfully created" });
  } else {
    return res.status(404).json({ message: "Invalid data received" });
  }
});

module.exports = { getAllTheme, createTheme };
