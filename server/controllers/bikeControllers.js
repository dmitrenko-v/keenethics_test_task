const bikesService = require("../service/bikesService");
const validateBike = require("../utils/valiadateBike");

class BikeController {
  async getBikes(req, res) {
    try {
      const bikes = await bikesService.getBikes();

      return res.status(200).json(bikes);
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  }

  async createBike(req, res) {
    try {
      const bikeData = req.body;

      const sameBike = await bikesService.getBike(bikeData.id);
      if (!validateBike(bikeData) || sameBike) return res.status(400).json({ error: true, message: "Invalid bike data" });

      await bikesService.createBike(bikeData);

      return res.status(200).json(bikeData);
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  }

  async updateBike(req, res) {
    try {
      const { id } = req.params;
      const { newStatus } = req.body;

      const possibleStatuses = ["available", "busy", "unavailable"];
      if (!possibleStatuses.includes(newStatus)) return res.status(400).json({ error: true, message: "Invalid bike status" });

      const bike = bikesService.getBike(id);
      if (!bike) return res.status(404).json({ error: true, message: "Bike not found" });

      const updatedBike = await bikesService.updateBikeStatus(id, newStatus);

      return res.status(200).json(updatedBike);
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  }

  async deleteBike(req, res) {
    try {
      const { id } = req.params;

      const bike = await bikesService.getBike(id);
      if (!bike) return res.status(404).json({ error: true, message: "Bike not found" });

      await bikesService.deleteBike(id);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  }
}

const bikeController = new BikeController();

module.exports = bikeController;
