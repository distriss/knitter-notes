const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const patternsController = require("../controllers/patterns");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Pattern Routes
router.post("/createPattern/:id", upload.single("file"), patternsController.createPattern);

// Edit Pattern Routes

// Delete Pattern Routes

module.exports = router;