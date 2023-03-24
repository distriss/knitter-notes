const express = require("express");
const router = express.Router();
const patternsController = require("../controllers/patterns");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Pattern Routes
router.post("/createPattern/:id", patternsController.createPattern);

// Edit Pattern Routes

// Delete Pattern Routes

module.exports = router;