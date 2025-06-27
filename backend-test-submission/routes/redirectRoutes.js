const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrlController");

router.get("/:shortcode", shortUrlController.redirectShortUrl);

module.exports = router;
