const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// GET ALL CATEGORY
const getAllCategory = asyncHandler(async (req, res) => {
  // params
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 10;

  // search user by params
  const categories = await Category.find()
    .skip(page * limit)
    .limit(limit)
    .select("-password")
    .lean();

  // if there are no user found
  if (!categories.length) {
    return res.status(404).json({ message: "No Categories Found" });
  }

  // count total users data
  const total = await Category.countDocuments();

  // response data
  const response = {
    data: categories,
    limit,
    page: page + 1,
    total,
  };

  res.status(200).json(response);
});

// CREATE CATEGORY
const createCategory = asyncHandler(async (req, res) => {
  // CREATE CATEGORY
  const newCategory = req.body.category;
  const objCategory = { title: newCategory };

  const category = await Category.create(objCategory);

  if (category) {
    res.status(201).json({ message: "Category Successfully Created" });
  } else {
    res.status(401).json({ message: "Category Failed to Created" });
  }
});

module.exports = { getAllCategory, createCategory };
