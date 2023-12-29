const Bike = require("../models/Bike");

class BikesService {
  async getBikes() {
    const bikes = await Bike.find().exec();
    return bikes;
  }

  async getBike(id) {
    const bike = await Bike.findOne({ id }).exec();
    return bike;
  }

  async createBike(bikeData) {
    bikeData.price = Number(bikeData.price.toFixed(2));
    const newBike = new Bike(bikeData);
    await newBike.save();
  }

  async updateBikeStatus(id, status) {
    const bike = await this.getBike(id);
    bike.status = status;
    await bike.save();
    return bike;
  }

  async deleteBike(id) {
    await Bike.deleteOne({ id }).exec();
  }

  async getBikesStats() {
    const bikes = await Bike.find().exec();
    const bikeCount = bikes.length;
    const availableBikes = bikes.filter(
      (bike) => bike.status === "available",
    ).length;
    const bookedBikes = bikes.filter((bike) => bike.status === "busy").length;
    const avgBikeCost = Number(
      (
        bikes.reduce((sum, currBike) => sum + currBike.price, 0) / bikeCount
      ).toFixed(2),
    );
    const bikeStats = {
      bikeCount,
      availableBikes,
      bookedBikes,
      avgBikeCost,
    };
    return bikeStats;
  }
}

const bikesService = new BikesService();

module.exports = bikesService;
