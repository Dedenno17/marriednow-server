const express = require("express");
const {
  login,
  register,
  getProfileUser,
  refreshToken,
} = require("../controllers/auth");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

// ROUTES
router.post("/login", loginLimiter, login);
router.post("/register", register);
router.get("/profile", verifyJWT, getProfileUser);
router.get("/refresh", verifyJWT, refreshToken);

module.exports = router;
