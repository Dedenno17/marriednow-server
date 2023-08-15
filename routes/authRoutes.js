const express = require("express");
const { login } = require("../controllers/auth");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.post("/login", login);

module.exports = router;
