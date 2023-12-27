const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bikeSchema = new Schema({
  id: String,
  name: String,
  type: String,
  color: String,
  wheelSize: Number,
  price: Number,
  description: String,
});

const Bike = mongoose.model("Bike", schema);

export default Bike;
