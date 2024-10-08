const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  timer: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
