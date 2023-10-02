const express = require("express");
const { getAllTheme, createTheme } = require("../controllers/theme");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.get("/", getAllTheme);
router.post("/", verifyJWT, createTheme);

module.exports = router;
