const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/bikeRoutes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bikes", router);

const PORT = 8080;

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
