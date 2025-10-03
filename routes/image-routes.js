const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImage } = require("../controllers/image-controllers");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

module.exports = router;
