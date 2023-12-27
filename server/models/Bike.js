const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bikeSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  wheelSize: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "available" },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
