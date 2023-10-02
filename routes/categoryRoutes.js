const express = require("express");
const { getAllCategory, createCategory } = require("../controllers/category");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.get("/", getAllCategory);
router.post("/", verifyJWT, createCategory);

module.exports = router;
