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
}

const bikesService = new BikesService();

module.exports = bikesService;
