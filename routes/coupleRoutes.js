const express = require("express");
const { getCoupleById, createCouple } = require("../controllers/couple");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTE
const router = express.Router();

router.use(verifyJWT);

// ROUTES
router.get("/:id", getCoupleById);
router.post("/", createCouple);

module.exports = router;
