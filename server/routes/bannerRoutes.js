const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");

// Get data
router.get("/", async (req, res) => {
  try {
    const banner = await Banner.findOne();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update data
router.post("/update", async (req, res) => {
  const { description, timer, link, isVisible } = req.body;

  if (!description || !timer || !link || typeof isVisible !== 'boolean') {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    let banner = await Banner.findOne();

    if (banner) {
      banner.description = description;
      banner.timer = timer;
      banner.link = link;
      banner.isVisible = isVisible;
    } else {
      banner = new Banner({
        description,
        timer,
        link,
        isVisible,
      });
    }

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
