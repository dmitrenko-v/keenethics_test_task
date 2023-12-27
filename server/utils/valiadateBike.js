const Bike = require("../models/Bike");

function validateBike(bikeData) {
  const { id, name, type, color, wheelSize, price, description } = bikeData;
  const stringFields = [id, name, type, color, description];
  const numberFields = [price, wheelSize];

  return (
    stringFields.every(
      (prop) => typeof prop === "string" && prop.length >= 5 && isNaN(prop)
    ) && numberFields.every((prop) => typeof prop === "number")
  );
}

module.exports = validateBike;
