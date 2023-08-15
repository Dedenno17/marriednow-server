const express = require("express");
const { login, register, getProfileUser } = require("../controllers/auth");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.post("/login", loginLimiter, login);
router.post("/register", register);
router.get("/profile", verifyJWT, getProfileUser);

module.exports = router;
