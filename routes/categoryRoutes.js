const express = require("express");
const { getAllCategory, createCategory } = require("../controllers/category");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

router.use(verifyJWT);

// ROUTES
router.get("/", getAllCategory);
router.post("/", createCategory);

module.exports = router;
