const express = require("express");
const { uploadImage } = require("../controllers/uploadImage");
const { upload } = require("../config/multerSotrage");
const { verifyJWT } = require("../middleware/verifyJWT");

// CREATE ROUTES
const router = express.Router();

router.use(verifyJWT);

// ROUTES
router.post("/", upload.single("file"), uploadImage);

module.exports = router;
