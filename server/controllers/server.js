const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));



const bannerRoutes = require("../routes/bannerRoutes");
app.use("/api/banner", bannerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
