const express = require("express");
const { login, register } = require("../controllers/auth");
const { loginLimiter } = require("../middleware/loginLimiter");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.post("/login", loginLimiter, login);
router.post("/register", register);

module.exports = router;
