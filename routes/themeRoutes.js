const express = require("express");
const { getAllTheme, createTheme } = require("../controllers/theme");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

router.use(verifyJWT);

// ROUTES
router.get("/", getAllTheme);
router.post("/", createTheme);

module.exports = router;
