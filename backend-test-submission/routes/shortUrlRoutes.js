const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrlController");

router.post("/shorturl", shortUrlController.createShortUrl);
router.get("/shorturl/:shortcode", shortUrlController.getStats);

router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

module.exports = router;
